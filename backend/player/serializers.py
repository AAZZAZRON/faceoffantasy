from rest_framework import serializers
from .models import *

class SkaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skater
        fields = '__all__'

class GoalieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goalie
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class NHLTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = NHLTeam
        fields = '__all__'
