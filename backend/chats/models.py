from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
class ChatRoom(models.Model):
    participants = models.ManyToManyField(User,related_name='chat_room')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        names = " ".join(u.username for u in self.participants.all())
        return f"Room {names}"


class Messages(models.Model):
    room = models.ForeignKey(ChatRoom,on_delete=models.CASCADE,related_name='messages')
    sender = models.ForeignKey(User,on_delete=models.CASCADE,related_name='sent_messages')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username} {self.text[:30]}"
