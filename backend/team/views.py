from rest_framework import viewsets
from .serializers import *
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sys
sys.path.append("..")
from league.models import League

# Create your views here.

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

@csrf_exempt
def create_team(request):
    message = {'message': '', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)
        if (not data['name']):
            message['message'] = 'Team name is required'
            return JsonResponse(message)
        league = League.objects.filter(id=data['league']).first()
        if not league:
            message['message'] = 'League does not exist'
            return JsonResponse(message)
        if Team.objects.filter(league=league).filter(name=data['name']):
            message['message'] = 'A team with this name already exists'
            return JsonResponse(message)
        team = Team.objects.create(teamName=data['name'])
        team.league = league
        team.save()
        message['message'] = 'Team created successfully'
        message['success'] = True
    return JsonResponse(message)