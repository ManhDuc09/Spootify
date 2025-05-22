from django.db import models
from .album import Album
from .artist import Artist

class Track(models.Model):
    name = models.CharField(max_length=100)
    artists = models.ManyToManyField(Artist)
    album = models.ForeignKey(
        Album,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tracks'
    )
    duration = models.PositiveIntegerField()
    audio_url = models.URLField(max_length=1000)
    cover_url = models.URLField(null=True, blank=True , max_length=1000)
    release_date = models.DateField(null=True, blank=True)
    def __str__(self):
        return self.name