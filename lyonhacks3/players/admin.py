from django.contrib import admin
from .models import Player, Position, NHLTeam

admin.site.register(Player)
admin.site.register(Position)
admin.site.register(NHLTeam)