from django.contrib import admin

# Register your models here.
from .models import User


# default
# admin.site.register(User)


# custom admin
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'website_url', 'is_active', 'is_staff', 'is_superuser']

