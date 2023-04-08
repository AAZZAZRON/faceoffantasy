from django.contrib import admin
from .models import Skater, Goalie, NHLTeam

admin.site.register(Skater)
admin.site.register(Goalie)
admin.site.register(NHLTeam)