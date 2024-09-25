from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from django.utils import timezone

class Employe(models.Model):
    name = models.CharField(max_length=255, unique=True)  
    email = models.CharField(max_length=255, default="usser1")
    adresse = models.CharField(max_length=50, default="usser1")
    phone = models.CharField(max_length=50, default="usser1")
    job = models.CharField(max_length=50, default="usser1")
    password = models.CharField(max_length=50, default='myCompany123')
    department = models.CharField(max_length=255, default="informatique")
    date = models.DateTimeField(default=datetime(2024, 1, 1, 0, 0, 0))
    salaire = models.IntegerField(default=0)  
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateTimeField(default=datetime.now)


    def delete_related_user(self):
        try:
            user = User.objects.get(username=self.name)
            user.delete()
            return True
        except User.DoesNotExist:
            return False


    def save(self, *args, **kwargs):
        job_salary_mapping = {
            "Technicien supérieur": 1500,
            "Technicien": 1200,
            "Développeur": 2000,
            "Vendeur": 1200,
            "Manager": 2200,
            "Spécialiste des achats": 1600,
        }

        self.salaire = job_salary_mapping.get(self.job, 0)
        super(Employe, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class LeaveRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default='5')
    user = models.TextField(default="username")
    number_of_days = models.IntegerField()
    reason = models.TextField()
    date_debut = models.DateField(default=timezone.now)
    title = models.CharField(max_length=255, default="title")  
    submitted_at = models.DateTimeField(auto_now_add=True)


class LeaveRequestAdmin(models.Model):
    user = models.TextField(default="username")
    number_of_days = models.IntegerField()
    reason = models.TextField()
    date_debut = models.DateField(default=timezone.now)
    title = models.CharField(max_length=255, default="title")  
    submitted_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)



class ActionDemande(models.Model):
    demande = models.ForeignKey(LeaveRequest, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20)
    date_reponse = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    user = models.CharField(max_length=100,default='username1')  

class AdminActionDemande(models.Model):
    demande = models.ForeignKey(LeaveRequest, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20)
    date_reponse = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    user = models.CharField(max_length=100, default='username1')


class Formation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    duration = models.DurationField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/', null=True, blank=True)


class FormationAdmin(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    duration = models.DurationField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    


class FormationInterssant(models.Model):
    title = models.CharField(max_length=200)
    name = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    

from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={'is_superuser': True})
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    id_card = models.CharField(max_length=20, blank=True, null=True)
    Num_Compte = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.user.username
