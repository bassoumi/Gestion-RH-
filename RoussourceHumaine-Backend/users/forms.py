from django import forms
from django.contrib.auth.models import User
from .models import Profile

class CustomUserCreationForm(forms.ModelForm):
    phone_number = forms.CharField(max_length=15, required=False)
    id_card = forms.CharField(max_length=20, required=False)
    Num_Compte=forms.CharField(max_length=20, required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            if user.is_superuser:
                Profile.objects.create(user=user, phone_number=self.cleaned_data["phone_number"], id_card=self.cleaned_data["id_card"],Num_Compte=self.cleaned_data["Num_Compte"])
        return user

class CustomUserChangeForm(forms.ModelForm):
    phone_number = forms.CharField(max_length=15, required=False)
    id_card = forms.CharField(max_length=20, required=False)
    Num_Compte=forms.CharField(max_length=20, required=False)


    class Meta:
        model = User
        fields = ('username', 'email')

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
            if user.is_superuser:
                profile, created = Profile.objects.get_or_create(user=user)
                profile.phone_number = self.cleaned_data["phone_number"]
                profile.id_card = self.cleaned_data["id_card"]
                profile.Num_Compte = self.cleaned_data["Num_Compte"]
                profile.save()
        return user
