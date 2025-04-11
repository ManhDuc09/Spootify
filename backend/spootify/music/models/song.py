from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    duration = models.IntegerField()  

    def __str__(self):
        return f"{self.title} - {self.artist}"