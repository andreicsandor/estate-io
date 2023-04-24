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
    

class CommercialProperty:
    def __init__(self, name, image, price, location, offices, bathrooms, area, description):
        self.name = name
        self.image = image
        self.price = price
        self.location = location
        self.offices = offices
        self.bathrooms = bathrooms
        self.area = area
        self.description = description

    def __str__(self):
        return f"{self.name} at {self.location} with {self.offices} offices, {self.bathrooms} bathrooms, and {self.area} area"


class ResidentialProperty:
    def __init__(self, name, image, price, location, bedrooms, bathrooms, area, description):
        self.name = name
        self.image = image
        self.price = price
        self.location = location
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.area = area
        self.description = description

    def __str__(self):
        return f"{self.name} at {self.location} with {self.offices} bedrooms, {self.bathrooms} bathrooms, and {self.area} area"


class News(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}, from {self.created}"
    
    class Meta:
        verbose_name_plural = "News"