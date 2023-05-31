# Generated by Django 4.2 on 2023-05-03 13:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0013_alter_residentialappointment_residential_property'),
    ]

    operations = [
        migrations.AddField(
            model_name='residentialappointment',
            name='person',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]