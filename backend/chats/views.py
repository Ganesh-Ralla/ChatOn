from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

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

# get all rooms
@api_view(['GET'])
def get_all_chats(request):
    room = ChatRoom.objects.all()
    serializer = ChatRoomSerializer(room,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages_by_room(request,pk):
    try:
        room = ChatRoom.objects.get(pk=pk)
    except ChatRoom.DoesNotExist:
        return Response({"message":"room not found"})

    messages = Messages.objects.filter(room=room)
    serializer = MessageSerializer(messages,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_messages_by_room(request,pk):
    room = ChatRoom.objects.get(pk=pk)

    serializer = MessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(room=room)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_latest_message_by_user(request):
    users = User.objects.all().exclude(id=request.user.id).exclude(is_superuser=True)

    data = [] 

    for user in users:
        # print("Users",user.id," ",user.username)
        room = ChatRoom.objects.filter(participants=request.user).filter(participants=user).first()
        latest_message = None

        if room:
            latest_message = room.messages.order_by('-timestamp').first()

        data.append({
            'id':user.id,
            'username':user.username,
            'latest_message':latest_message.text if latest_message else None,
            'timestamp':latest_message.timestamp if latest_message else None
        })

    return Response(data)
