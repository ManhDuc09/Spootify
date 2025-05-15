from django.urls import path , include
from .views import LoginView, RefreshTokenView, logout_view, register_view , track_list_view , album_detail_view

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('token/', LoginView.as_view(), name='token_obtain_pair'),
    path('tracks/', track_list_view, name='track-list'),
    path('albums/<int:pk>/', album_detail_view)
]