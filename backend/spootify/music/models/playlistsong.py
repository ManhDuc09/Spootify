from django.db import models
from .playlist import Playlist
from .track import Track

class PlaylistSong(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    order = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('playlist', 'track')