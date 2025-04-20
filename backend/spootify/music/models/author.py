from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.name
