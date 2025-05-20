from django.db import models
from .user import CustomUser

class ChatMessage(models.Model):
    from_user = models.ForeignKey(CustomUser, related_name='sent_messages', on_delete=models.CASCADE)
    to_user = models.ForeignKey(CustomUser, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_user} -> {self.to_user}: {self.message[:20]}"
