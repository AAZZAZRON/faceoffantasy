from rest_framework import viewsets
from .models import *
from .serializers import *
from django.http import JsonResponse
# Create your views here.

class SkaterView(viewsets.ModelViewSet):
    serializer_class = SkaterSerializer
    queryset = Skater.objects.all()

class NHLTeamView(viewsets.ModelViewSet):
    serializer_class = NHLTeamSerializer
    queryset = NHLTeam.objects.all()

class PositionView(viewsets.ModelViewSet):
    serializer_class = PositionSerializer
    queryset = Position.objects.all()

class GoalieView(viewsets.ModelViewSet):
    serializer_class = GoalieSerializer
    queryset = Goalie.objects.all()

def countPlayers(request):
    skaterCount = Skater.objects.count()
    goalieCount = Goalie.objects.count()
    return JsonResponse({'skaterCount': skaterCount, 'goalieCount': goalieCount})