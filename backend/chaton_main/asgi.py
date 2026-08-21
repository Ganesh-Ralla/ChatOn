"""
ASGI config for chaton_main project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter

from chats.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chaton_main.settings')

application = ProtocolTypeRouter({
    "http":get_asgi_application(),

    "websocket": URLRouter(websocket_urlpatterns),
})
