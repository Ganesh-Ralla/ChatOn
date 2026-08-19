from django.contrib import admin
from .models import ChatRoom,Messages

# Register your models here.


admin.site.register(ChatRoom)

class MessagesAdmin(admin.ModelAdmin):
    list_display=['id','sender','text']
    ordering=['id']

admin.site.register(Messages,MessagesAdmin)