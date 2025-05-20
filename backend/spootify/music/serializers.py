from rest_framework import serializers
from .models import Track, Artist, Album , CustomUser , Playlist

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']

class AlbumSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'image' , 'release_date']

class TrackSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True, read_only=True)
    album = AlbumSummarySerializer(read_only=True)
    album_id = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(),
        source='album',
        required=True, 
        write_only=False,  
    )
    artist_ids = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        many=True,
        write_only=False,
        source='artists'   
    )
    class Meta:
        model = Track
        fields = ['id', 'name', 'artists', 'album', 'duration', 'audio_url', 'cover_url' , 'artist_ids' , 'album_id']

class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    artist = ArtistSerializer(read_only=True)  # nested artist object for display
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='artist',
        required=True, 
        write_only=False,  
    )

    class Meta:
        model = Album
        fields = ['id', 'name', 'artist', 'artist_id', 'image', 'tracks', 'release_date']



class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']

