from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROL_CHOICES = [
        ('socia', 'Socia'),
        ('freelancer', 'Freelancer'),
    ]
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default='socia')
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.username} ({self.rol})"
    