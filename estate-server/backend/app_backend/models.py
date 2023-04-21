from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    role = models.CharField(max_length=50, choices=[('client', 'Client'), ('agent', 'Agent')], default='client')
    preference = models.CharField(max_length=50, choices=[('commercial', 'Commercial'), ('residential', 'Residential')])

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username
