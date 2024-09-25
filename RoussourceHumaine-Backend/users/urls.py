# urls.py
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import UserList, UserDetail, search_users, UserLoginView , LeaveRequestListCreateView, LeaveRequestDetailView,get_all_demandes,change_password,FormationCreateView,FormationAdminListView, FormationAdminDeleteView ,FormationUserListView,FormationInterssantListView
from .views import CustomLogoutView, check_superuser
from django.contrib.auth import views as auth_views
from . import views
urlpatterns = [
    path('users/', UserList.as_view(), name="user-list"),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('search/', search_users, name='search-users'),
    path('token/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('api/logout/', CustomLogoutView.as_view(), name='auth_logout'),
    path('api/check_superuser/', check_superuser, name='check_superuser'),
    path('users/search', search_users, name='user-search'),
     path('demandes/approve/', views.approuver_demande, name='approuver_demande'),
    path('demandes/reject/', views.rejeter_demande, name='rejeter_demande'),
    path('leave_requests/', LeaveRequestListCreateView.as_view(), name='leave-request-list-create'),
    path('leave_requests/<int:pk>/', LeaveRequestDetailView.as_view(), name='leave-request-detail'),
    path('get_all_demandes/', get_all_demandes, name='get_all_demandes'),
     path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('change-password/', change_password, name='change_password'),
    path('demandes/<int:id>/', views.delete_demande, name='delete_demande'),
    path('delete_all_demandes/', views.delete_all_demandes, name='delete_all_demandes'),
    path('get_all_demandes_admin/', views.get_all_demandes_admin, name='get_all_demandes_admin'),
    path('get_all_request_admin/', views.get_all_request_admin, name='get_all_request_admin'),
    path('add-formation/', FormationCreateView.as_view(), name='add-formation'),
    path('admin-formations/', FormationAdminListView.as_view(), name='admin-formations-list'),
     path('user-formations/', FormationUserListView.as_view(), name='admin-formations-list'),
    path('admin-formations/<int:pk>/', FormationAdminDeleteView.as_view(), name='admin-formation-delete'),
    path('all-intersse/', FormationInterssantListView.as_view(), name='all-intersse'),





]

