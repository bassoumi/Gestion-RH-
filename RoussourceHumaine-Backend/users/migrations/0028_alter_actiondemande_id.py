# Generated by Django 5.0.6 on 2024-06-14 22:38

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_alter_actiondemande_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actiondemande',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
