from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator

# Create your models here.



class User(AbstractUser):

    ROLE_CHOICES = [
        ('admin', 'Super Admin'),
        ('salesman', 'Salesman'),
    ]
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='admin')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"{self.username} ({self.email})"
