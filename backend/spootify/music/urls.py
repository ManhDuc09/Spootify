from django.urls import path , include

from .views import ArtistDetailView, LoginView, RefreshTokenView, TracksByArtistView, logout_view, register_view ,  AlbumListView , TrackListView , AlbumDetailView , ArtistListView , CurrentUserView , UploadImageView , TrackDetailView ,  PlaylistView, UserList , get_chat_history , PlaylistDetailView , AddTrackToPlaylistView , RemoveTrackFromPlaylistView, UserDetailView , PlaylistStatusUpdateView

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
    path('playlists/', PlaylistView.as_view(), name='playlist-create'),
    path('upload-image/',UploadImageView.as_view() ),
    path('tracks/<int:pk>/', TrackDetailView.as_view(), name='track-detail'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>' , UserDetailView.as_view()),
    path('artists/<int:pk>/', ArtistDetailView.as_view()),
    path('artists/<int:artist_id>/tracks/', TracksByArtistView.as_view(), name='tracks-by-artist'),
    path('chat/history/', get_chat_history, name='chat_history'),
    path('playlists/<int:pk>/', PlaylistDetailView.as_view(), name='playlist-detail'),
    path('playlists/<int:pk>/add-track/', AddTrackToPlaylistView.as_view(), name='add-track-to-playlist'),
    path('playlists/<int:pk>/remove-track/', RemoveTrackFromPlaylistView.as_view(), name='remove_track_from_playlist'),
    path('playlists/<int:pk>/status/', PlaylistStatusUpdateView.as_view(), name='playlist-status-update'),
]