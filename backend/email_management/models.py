# from django.db import models
# from django.utils import timezone
# import uuid
# import secrets

# class FormToken(models.Model):
#     token = models.CharField(max_length=255, unique=True, default=secrets.token_urlsafe)
#     client_email = models.EmailField()
#     is_used = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     expires_at = models.DateTimeField()
    
#     def save(self, *args, **kwargs):
#         if not self.expires_at:
#             self.expires_at = timezone.now() + timezone.timedelta(days=7)
#         super().save(*args, **kwargs)
    
#     def is_valid(self):
#         return not self.is_used and self.expires_at > timezone.now()
    
#     def __str__(self):
#         return f"Token for {self.client_email}"
