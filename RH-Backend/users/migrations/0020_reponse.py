# Generated by Django 5.0.6 on 2024-06-13 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_remove_leaverequest_username_alter_leaverequest_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reponse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contenu', models.TextField()),
                ('statut', models.CharField(choices=[('approuve', 'Approuvé'), ('refuse', 'Refusé')], max_length=10)),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]