from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profiles'
    fields = ('phone_number', 'id_card','Num_Compte')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(user__is_superuser=True)

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    inlines = (ProfileInline,)

    list_display = ['username', 'email', 'is_staff', 'is_superuser']

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email')}
        ),
    )

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        if request.user.is_superuser:
            if obj and obj.is_superuser:
                fieldsets = (
                    (None, {'fields': ('username', 'password')}),
                    ('Personal info', {'fields': ('email', 'phone_number', 'id_card','Num_Compte')}),
                    ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
                    ('Important dates', {'fields': ('last_login', 'date_joined')}),
                )
        return fieldsets

    def get_inline_instances(self, request, obj=None):
        if not request.user.is_superuser:
            return []
        if obj and not obj.is_superuser:
            return []
        return super().get_inline_instances(request, obj)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
