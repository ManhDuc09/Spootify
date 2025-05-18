from django.urls import path , include
from .views import LoginView, RefreshTokenView, logout_view, register_view ,  AlbumListView , TrackListView , AlbumDetailView , CurrentUserView
from .views import LoginView, RefreshTokenView, logout_view, register_view ,  AlbumListView , TrackListView , AlbumDetailView , ArtistListView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('token/', LoginView.as_view(), name='token_obtain_pair'),
    path('tracks/', TrackListView.as_view(), name='track-list'),
    path('albums/<int:pk>/', AlbumDetailView.as_view()),
    path('albums/',AlbumListView.as_view()),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('artists/', ArtistListView.as_view()),
]