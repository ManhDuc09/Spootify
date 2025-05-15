from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=100)
    genre = models.CharField(max_length=100, null=True, blank=True)
    image = models.BinaryField(null=True, blank=True)

    def __str__(self):
        return self.name