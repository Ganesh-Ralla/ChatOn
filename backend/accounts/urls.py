from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from . import views


urlpatterns = [
    path('users/',views.users),
    path('user/<int:pk>/',views.get_user_details),

    path('login/',TokenObtainPairView.as_view()),
    path('login/refresh/',TokenRefreshView.as_view()),

    path('logged-in-user/',views.get_logged_in_user),
]
