# Generated by Django 3.2.21 on 2024-07-24 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enduser', '0002_enduser_image_enduser_image_encodings'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='enduser',
            name='image',
        ),
        migrations.AlterField(
            model_name='enduser',
            name='image_encodings',
            field=models.JSONField(null=True),
        ),
    ]
