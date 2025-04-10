import django.db from models
import .artist import Artist

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    release_date = models.DateField()
    genre = models.CharField(max_length=255)
    cover_image = models.URLField()
    track_count = models.IntegerField()

    def __str__(self):
        return self.title

