from django.db import models
from .user import CustomUser

class Playlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='playlists')
    name = models.CharField(max_length=100)
    image = models.BinaryField(null=True, blank=True)
    status = models.BooleanField(default=True) 

    def __str__(self):
        return self.name
