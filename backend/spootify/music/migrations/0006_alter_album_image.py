# Generated by Django 5.1.7 on 2025-05-18 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0005_remove_customuser_date_of_birth_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
