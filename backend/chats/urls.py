from django.urls import path

from . import views

urlpatterns = [
    path('chats/latest/',views.get_latest_message_by_user),

    path('chat/<int:user_id>/',views.get_or_create_room),
    path('chat/<int:pk>/messages/',views.get_messages_by_room),
    path('chat/<int:pk>/messages/send/',views.send_messages_by_room),
    
]
