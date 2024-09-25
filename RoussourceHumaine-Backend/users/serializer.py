# serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Employe , LeaveRequest,Formation,FormationAdmin,FormationInterssant
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        exclude = ('password',)


        

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data["user"] = user
                    return data
                else:
                    raise serializers.ValidationError("User is not active.")
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must provide both username and password.")
        
class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['id', 'user', 'number_of_days', 'reason', 'date_debut', 'title', 'submitted_at']


class LeaveRequestSerializerAdmin(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = ['id', 'user', 'number_of_days', 'reason', 'date_debut', 'title', 'submitted_at']



from .models import AdminActionDemande


class AdminActionDemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminActionDemande
        fields = '__all__'


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = '__all__'

class FormationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationAdmin
        fields = '__all__'

class FormationInterssantSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormationInterssant
        fields = '__all__'
