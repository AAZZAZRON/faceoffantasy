from rest_framework import serializers
from .models import *

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('fullName', 'currentTeam', 'id')

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('name', 'code', 'type', 'abbreviation')


class NHLTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = NHLTeam
        fields = ('id', 'name', 'link', 'abbreviation', 'teamName', 'locationName', 'shortName', 'officialSiteUrl', 'division', 'conference')
