from django.contrib import admin
from .models import User, LastUpdated

# Register your models here.

admin.site.register(User)
admin.site.register(LastUpdated)