# Generated by Django 4.2 on 2023-04-26 10:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_backend', '0010_commercialappointment_person_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commercialappointment',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 26, 11, 11, 25, 122871)),
        ),
        migrations.AlterField(
            model_name='residentialappointment',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 26, 11, 11, 25, 123357)),
        ),
    ]
