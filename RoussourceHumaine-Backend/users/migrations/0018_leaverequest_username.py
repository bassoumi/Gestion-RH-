# Generated by Django 5.0.6 on 2024-06-13 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_leaverequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='leaverequest',
            name='username',
            field=models.TextField(default='username'),
        ),
    ]
