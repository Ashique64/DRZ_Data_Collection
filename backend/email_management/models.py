from django.db import models
from django.utils import timezone
import uuid
import secrets
from django.core.validators import EmailValidator
from authentications.models import User



class Categories(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)\
    

    def __str__(self):
        return self.name

class FormToken(models.Model):
    token = models.CharField(max_length=255, unique=True, default=secrets.token_urlsafe)
    salesman = models.ForeignKey(User, on_delete=models.CASCADE, related_name='form_tokens')
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    client_email = models.EmailField(null=False, blank=False, validators=[EmailValidator()])
    client_name = models.CharField(null=False, blank=False, max_length=255)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    
    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timezone.timedelta(days=7)
        super().save(*args, **kwargs)
    
    def is_valid(self):
        return not self.is_used and self.expires_at > timezone.now()
    
    def __str__(self):
        return f"Token for {self.client_email}"
    

