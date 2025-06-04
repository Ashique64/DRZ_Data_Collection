from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
from django.utils import timezone

# Create your models here.


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=32, blank=True, null=True)
    token_created_at = models.DateTimeField(blank=True, null=True)

    @property
    def is_token_valid(self):
        if not self.token or not self.token_created_at:
            return False
        return timezone.now() < self.token_created_at + timedelta(days=7)
