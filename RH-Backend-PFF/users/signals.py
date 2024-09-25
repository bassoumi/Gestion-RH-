from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Employe
from django.db.utils import IntegrityError
from django.db.models.signals import post_save, post_delete
@receiver(post_save, sender=Employe)
@receiver(post_save, sender=Employe)
def create_user_for_employe(sender, instance, created, **kwargs):
    if created:
        try:
            if User.objects.filter(username=instance.name).exists():
                raise IntegrityError("Username already exists")
            if User.objects.filter(email=instance.email).exists():
                raise IntegrityError("Email already exists")

            user = User(
                username=instance.name,
                email=instance.email,
            )
            user.set_password(instance.password)
            user.save()
            instance.user = user
            instance.save()
        except IntegrityError as e:
            instance.delete()  # Roll back the Employe creation if User creation fails
            raise IntegrityError(str(e))
        
