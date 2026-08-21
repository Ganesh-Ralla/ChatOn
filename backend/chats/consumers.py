import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User

from .models import ChatRoom, Messages


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        # Get JWT token from WebSocket URL
        query_string = self.scope["query_string"].decode()

        try:
            token = query_string.split("token=")[1]

            # Validate JWT
            access_token = AccessToken(token)

            # Get user ID
            user_id = access_token["user_id"]

            # Get Django user
            self.user = await User.objects.aget(id=user_id)

        except Exception:
            await self.close()
            return

        print("WebSocket user:", self.user.username)

        # Get room ID from URL
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]

        # Create group name
        self.room_group_name = f"chat_{self.room_id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept WebSocket
        await self.accept()

        print("Connected to room:", self.room_id)

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        print("Disconnected from room:", self.room_id)

    async def receive(self, text_data):

        data = json.loads(text_data)

        print("Message received:", data)

        # Save message to database
        message = await self.save_message(data["text"])

        # Send message to everyone in this room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
            }
        )

    @database_sync_to_async
    def save_message(self, text):

        room = ChatRoom.objects.get(id=self.room_id)

        message = Messages.objects.create(
            room=room,
            sender=self.user,
            text=text
        )

        return {
            "id": message.id,
            "text": message.text,
            "sender": message.sender_id,
            "timestamp": message.timestamp.isoformat(),
        }

    async def chat_message(self, event):

        await self.send(
            text_data=json.dumps({
                "type": "message",
                **event["message"],
            })
        )