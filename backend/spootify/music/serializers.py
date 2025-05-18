from rest_framework import serializers
from .models import Track, Artist, Album , CustomUser

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']


class AlbumSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'name', 'image']

class TrackSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)
    album = AlbumSummarySerializer()  

    class Meta:
        model = Track
        fields = ['id', 'name', 'artists', 'album', 'duration', 'audio_url', 'cover_url']

class AlbumSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)
    artist = ArtistSerializer()

    class Meta:
        model = Album
        fields = ['id', 'name', 'artist', 'image', 'tracks']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']
