from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, CommercialProperty, ResidentialProperty, CommercialAppointment, ResidentialAppointment, News


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


class CommercialPropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'location', 'offices', 'bathrooms', 'area')
    list_filter = ('location', 'offices', 'bathrooms', 'area')
    search_fields = ('name', 'location')


class ResidentialPropertyAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'location', 'bedrooms', 'bathrooms', 'area')
    list_filter = ('location', 'bedrooms', 'bathrooms', 'area')
    search_fields = ('name', 'location')


class CommercialAppointmentAdmin(admin.ModelAdmin):
    list_display = ('commercial_property', 'time')


class ResidentialAppointmentAdmin(admin.ModelAdmin):
    list_display = ('residential_property', 'time')


class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'body', 'created')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(CommercialProperty, CommercialPropertyAdmin)
admin.site.register(ResidentialProperty, ResidentialPropertyAdmin)
admin.site.register(CommercialAppointment, CommercialAppointmentAdmin)
admin.site.register(ResidentialAppointment, ResidentialAppointmentAdmin)
admin.site.register(News, NewsAdmin)