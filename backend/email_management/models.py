from django.db import models
# import uuid
from django.contrib.auth.models import User
# from datetime import datetime, timedelta

# Create your models here.


class Client(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)






























    

# class EmailInvitation(models.Model):
#     STATUS_CHOICES = [
#         ("pending", "Pending"),
#         ("sent", "Sent"),
#         ("opened", "Opened"),
#         ("completed", "Completed"),
#         ("expired", "Expired"),
#         ("failed", "Failed"),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     client_email = models.EmailField(max_length=255)
#     token = models.CharField(max_length=255, unique=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
#     sent_by = models.ForeignKey(User, on_delete=models.CASCADE)
#     sent_at = models.DateTimeField(null=True, blank=True)
#     expired_at = models.DateTimeField(null=True, blank=True)
#     opened_at = models.DateTimeField(null=True, blank=True)
#     completed_at = models.DateTimeField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def save(self, *args, **kwargs):
#         if not self.expired_at:
#             self.expired_at = datetime.now() + timedelta(days=7)
#         if not self.token:
#             self.token = str(uuid.uuid4())
#         super().save(*args, **kwargs)


#     def is_expired(self):
#         return datetime.now() > self.expired_at
    
#     def __str__(self):
#         return f"Invitation to {self.client_email} - {self.status}"