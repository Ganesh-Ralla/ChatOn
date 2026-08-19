from rest_framework import serializers

from .models import ChatRoom,Messages

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'
        read_only_fields = ['room']


class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(read_only=True,many=True)
    class Meta:
        model = ChatRoom
        fields = '__all__'