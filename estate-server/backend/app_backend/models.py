from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import timedelta, datetime


class CustomUser(AbstractUser):
    role = models.CharField(max_length=50, choices=[('client', 'Client'), ('agent', 'Agent')], default='client')
    preference = models.CharField(max_length=50, choices=[('commercial', 'Commercial'), ('residential', 'Residential')])

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = "Users"
    
    
class CommercialProperty(models.Model):
    name = models.CharField(max_length=200, default="Property")
    image = models.ImageField(upload_to='assets', null=True)
    price = models.IntegerField(null=True)
    location = models.CharField(max_length=200, null=True)
    offices = models.IntegerField(null=True)
    bathrooms = models.IntegerField(null=True)
    area = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    description = models.TextField(null=True)
    type = models.CharField(max_length=50, choices=[('sale', 'Sale'), ('rent', 'Rent')], default=('sale', 'Sale'))

    def __str__(self):
        return f"{self.name} at {self.location} with {self.offices} offices, {self.bathrooms} bathrooms, and {self.area} area"

    class Meta:
        verbose_name_plural = "Properties Commercial"


class ResidentialProperty(models.Model):
    name = models.CharField(max_length=200, default="Property")
    image = models.ImageField(upload_to='assets', null=True)
    price = models.IntegerField(null=True)
    location = models.CharField(max_length=200, null=True)
    bedrooms = models.IntegerField(null=True)
    bathrooms = models.IntegerField(null=True)
    area = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    description = models.TextField(null=True)
    type = models.CharField(max_length=50, choices=[('sale', 'Sale'), ('rent', 'Rent')], default=('sale', 'Sale'))

    def __str__(self):
        return f"{self.name} at {self.location} with {self.bedrooms} bedrooms, {self.bathrooms} bathrooms, and {self.area} area"

    class Meta:
        verbose_name_plural = "Properties Residential"


class CommercialAppointment(models.Model):
    commercial_property = models.ForeignKey(CommercialProperty, on_delete=models.CASCADE)
    person = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"Appointment for {self.commercial_property.name} from {self.time.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        verbose_name_plural = "Appointments Commercial"


class ResidentialAppointment(models.Model):
    residential_property = models.ForeignKey(ResidentialProperty, on_delete=models.CASCADE)
    person = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"Appointment for {self.residential_property.name} from {self.time.strftime('%Y-%m-%d %H:%M')}"
    
    class Meta:
        verbose_name_plural = "Appointments Residential"


class News(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}, from {self.created}"
    
    class Meta:
        verbose_name_plural = "News"