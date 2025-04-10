import django.db from models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    bio = models.TextField()
    image_url = models.URLField()

    def __str__(self):
        return self.name