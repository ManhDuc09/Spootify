from django.urls import path , include
from .views import LoginView, RefreshTokenView, logout_view, register_view

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
]