from django.contrib import admin
from .models import Player, Goalie, NHLTeam

admin.site.register(Player)
admin.site.register(Goalie)
admin.site.register(NHLTeam)