from django.contrib import admin
from .models import Player, Position, NHLTeam

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'currentTeam', 'id')

admin.site.register(Player)
admin.site.register(Position)
admin.site.register(NHLTeam)