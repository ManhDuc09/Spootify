from django.db import models
from .album import Album
from .artist import Artist

class Track(models.Model):
    name = models.CharField(max_length=100)
    artists = models.ManyToManyField(Artist)
    album = models.ManyToManyField(Album, blank=True, related_name='tracks')
    duration = models.PositiveIntegerField()
    audio_url = models.URLField()
    cover_url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.title