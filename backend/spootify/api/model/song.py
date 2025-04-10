import django.db as models

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    release_date = models.DateField()
    duration = models.IntegerField()  # Duration in seconds
    cover_image = models.URLField()
    audio_file = models.URLField()

    def __str__(self):
        return self.title