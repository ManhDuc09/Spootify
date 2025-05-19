from django.db import models
from .artist import Artist

class Album(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name