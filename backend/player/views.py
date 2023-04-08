from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
# Create your views here.

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

class NHLTeamView(viewsets.ModelViewSet):
    serializer_class = NHLTeamSerializer
    queryset = NHLTeam.objects.all()

class PositionView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class GoalieView(viewsets.ModelViewSet):
    serializer_class = GoalieSerializer
    queryset = Goalie.objects.all()