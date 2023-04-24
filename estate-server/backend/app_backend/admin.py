from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, News


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'preference', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'preference', 'role')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'body', 'created')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(News, NewsAdmin)