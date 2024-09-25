from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Employe , LeaveRequest ,LeaveRequestAdmin ,FormationInterssant,Formation
from .serializer import UserSerializer , UserLoginSerializer  , LeaveRequestSerializer ,FormationSerializer,FormationAdminSerializer,FormationInterssantSerializer
from django.db.utils import IntegrityError
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser



class UserList(generics.ListCreateAPIView):
    queryset = Employe.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employe.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.delete_related_user():
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

""" class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employe.objects.all()
    serializer_class = UserSerializer """


from django.http import JsonResponse
from django.db.models import Q
from .models import Employe
from .serializer import UserSerializer,AdminActionDemandeSerializer,LeaveRequestSerializerAdmin
from rest_framework.decorators import api_view

@api_view(['GET'])
def search_users(request):
    phone = request.GET.get('phone', None)
    department = request.GET.get('department', None)
    queryset = Employe.objects.all()

    if phone:
        queryset = queryset.filter(phone__icontains=phone)
    if department:
        queryset = queryset.filter(department__icontains=department)
    serializer = UserSerializer(queryset, many=True)
    return Response(serializer.data)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)
        username = UserLoginSerializer.username

        # Ajout de débogage
        username = user.username
        print(f"Authenticated user: {user}")
        print(f"User's username: {username}")

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username":  UserLoginSerializer.username 
        }, status=status.HTTP_200_OK)

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CustomLogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        print("Logout endpoint reached")
        try:
            refresh_token = request.data["refresh"]
            print(f"Refresh token: {refresh_token}")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"Error: {e}")
            return Response(status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
@api_view(['GET'])

@permission_classes([IsAuthenticated])
def check_superuser(request):
    return Response({'is_superuser': request.user.is_superuser})


class LeaveRequestListCreateView(generics.ListCreateAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        # Save the request in the user's table
        leave_request = serializer.save(user=user)
        
        # Create a similar entry in the admin's table
        LeaveRequestAdmin.objects.create(
            user=user,
            number_of_days=leave_request.number_of_days,
            reason=leave_request.reason,
            date_debut=leave_request.date_debut,
            title=leave_request.title
        )


class CountDemandesView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        count_demandes = LeaveRequest.objects.filter(user=self.request.user).count()
        return Response({'count': count_demandes}, status=status.HTTP_200_OK)

class LeaveRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import ActionDemande,AdminActionDemande
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def approuver_demande(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        demande = get_object_or_404(LeaveRequest, id=data['id'])
        action = ActionDemande(
            demande=demande, 
            status='approuvé', 
            title=demande.title,
            user=data['user']  
        )
        action.save()
        admin_action = AdminActionDemande(
            demande=demande,
            status='approuvé',
            title=demande.title,
            user=data['user']
        )
        admin_action.save()
        demande.delete()
        return JsonResponse({'status': 'Demande approuvée'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def rejeter_demande(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        demande = get_object_or_404(LeaveRequest, id=data['id'])
        action = ActionDemande(
            demande=demande,
            status='rejeté',
            title=demande.title,
            user=data['user']
        )
        action.save()
        admin_action = AdminActionDemande(
            demande=demande,
            status='rejeté',
            title=demande.title,
            user=data['user']
        )
        admin_action.save()
        demande.delete()
        return JsonResponse({'status': 'Demande rejetée'})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

from django.core.serializers import serialize

@csrf_exempt
def get_all_demandes(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')

        if username:
            demandes = ActionDemande.objects.filter(user=username)
            demandes_serialized = serialize('json', demandes)
            return JsonResponse({'demandes': demandes_serialized}, safe=False)
        else:
            return JsonResponse({'error': 'Username not provided'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)



@csrf_exempt
@api_view(['GET'])
def get_all_demandes_admin(request):
    if request.method == 'GET':
        demandes = AdminActionDemande.objects.all()
        demandes_serialized = AdminActionDemandeSerializer(demandes, many=True)
        return JsonResponse({'demandes': demandes_serialized.data}, safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
@api_view(['GET'])
def get_all_request_admin(request):
    if request.method == 'GET':
        request = LeaveRequestAdmin.objects.all()
        request_serialized = LeaveRequestSerializerAdmin(request, many=True)
        return JsonResponse({'demandes': request_serialized.data}, safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging 
import json
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    logger.info("Received change password request")
    try:
        data = request.data
        user = request.user
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        logger.info(f"User {user.username} is trying to change password")

        if not user.check_password(old_password):
            logger.warning("Old password is incorrect")
            return Response({'error': 'Ancien mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password, user)
        except ValidationError as e:
            logger.warning(f"New password validation failed: {e.messages}")
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        logger.info("Password changed successfully")
        return Response({'status': 'Mot de passe changé avec succès'})
    except Exception as e:
        logger.error(f"Error changing password: {e}", exc_info=True)
        return Response({'error': 'Erreur lors du changement de mot de passe'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['DELETE'])
def delete_demande(request, id):
    try:
        demande = ActionDemande.objects.get(id=id)
        demande.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ActionDemande.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@csrf_exempt
def delete_all_demandes(request):
    if request.method == 'DELETE':
        ActionDemande.objects.all().delete()
        return JsonResponse({'message': 'Toutes les demandes ont été supprimées.'}, status=204)
    else:
        return JsonResponse({'error': 'Méthode HTTP non autorisée.'}, status=405)

from rest_framework import viewsets
from .models import Formation ,FormationAdmin


class FormationCreateView(generics.CreateAPIView):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer
    def perform_create(self, serializer):
        formation_instance = serializer.save()
        FormationAdmin.objects.create(
            title=formation_instance.title,
            description=formation_instance.description,
            date=formation_instance.date,
            duration=formation_instance.duration,
            location=formation_instance.location,
            image=formation_instance.image
        )
        
from django.http import Http404

class FormationDeleteView(generics.DestroyAPIView):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)


class FormationAdminListView(generics.ListAPIView):
    queryset = FormationAdmin.objects.all()
    serializer_class = FormationAdminSerializer



class FormationUserListView(generics.ListAPIView):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer


class FormationAdminDeleteView(generics.DestroyAPIView):
    queryset = FormationAdmin.objects.all()
    serializer_class = FormationAdminSerializer
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        try:
            # Récupérer l'instance de FormationAdmin à supprimer
            instance = self.get_object()
            # Récupérer les détails nécessaires pour rechercher dans la table Formation
            title = instance.title
            date = instance.date
            location = instance.location
            # Supprimer l'instance de Formation correspondant aux critères
            Formation.objects.filter(title=title, date=date, location=location).delete()
            # Supprimer l'instance de FormationAdmin
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)

class FormationInterssantListView(generics.ListCreateAPIView):
    queryset = FormationInterssant.objects.all()
    serializer_class = FormationInterssantSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        username = self.request.query_params.get('username', None)
        title = self.request.query_params.get('title', None)
        if username and title:
            queryset = queryset.filter(name=username, title=title)
        return queryset

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        title = request.data.get('title')
        if username and title:
            new_entry = FormationInterssant(name=username, title=title)
            new_entry.save()
            serializer = self.serializer_class(new_entry)
            return Response(serializer.data)
        return Response({"error": "username and title are required"}, status=400)
            

