from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from django.db.models import OuterRef, Subquery

from .serializers import ChatRoomSerializer,MessageSerializer
from .models import ChatRoom,Messages




# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_or_create_room(request,user_id):
    logged_user = request.user
    try:
        other_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message':"No user found with the given id"},status=status.HTTP_404_NOT_FOUND)
    
    room = ChatRoom.objects.filter(participants=logged_user).filter(participants = other_user).distinct().first()

    if not room:
        room = ChatRoom.objects.create()
        room.participants.add(logged_user,other_user)

    return Response({"room_id":room.id})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages_by_room(request,pk):
    try:
        room = ChatRoom.objects.get(pk=pk)
    except ChatRoom.DoesNotExist:
        return Response({"message":"room not found"})

    messages = Messages.objects.filter(room=room).order_by('id')

    after = request.GET.get('after')
    if after:
        messages = messages.filter(id__gt=after)

    serializer = MessageSerializer(messages,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_messages_by_room(request,pk):
    room = ChatRoom.objects.get(pk=pk)

    if request.user not in room.participants.all():
        return Response({"message": "You are not a participant of this room"},status=status.HTTP_403_FORBIDDEN)

    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(room=room,sender=request.user)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_latest_message_by_user(request):

    latest_message = Messages.objects.filter(
        room__participants=request.user
    ).filter(
        room__participants=OuterRef('pk')
    ).order_by('-timestamp', '-id')

    users = User.objects.all().exclude(id=request.user.id).exclude(is_superuser=True)

    users = users.annotate(
        latest_message=Subquery(
            latest_message.values('text')[:1]
        ),
        latest_message_timestamp=Subquery(
            latest_message.values('timestamp')[:1]
        )
    )

    data = []

    for user in users:

        room = ChatRoom.objects.filter(participants=request.user).filter(participants=user).first()

        data.append({
            'id': user.id,
            'username': user.username,
            'latest_message': user.latest_message,
            'timestamp': user.latest_message_timestamp,
            'room_id': room.id if room else None,
        })

        print("LATEST CHAT DATA:", data)

    return Response(data)