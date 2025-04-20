from django.db import models
from .author import Author
from .genre import Genre

class Album(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='albums')
    release_date = models.DateField()
    genre = models.CharField(max_length=50)

    def __str__(self):
        return self.title
