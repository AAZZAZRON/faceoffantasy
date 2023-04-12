from rest_framework import viewsets
from .serializers import *
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

class LeagueView(viewsets.ReadOnlyModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

@csrf_exempt
def create_league(request):
    message = {'message': '', 'success': False, 'id': None}
    if request.method == 'POST':
        data = json.loads(request.body)
        data['owner'] = User.objects.get(id=data['owner'])
        if (not data['name']):
            message['message'] = 'League name is required'
            return JsonResponse(message)
        if League.objects.filter(name=data['name']):
            message['message'] = 'A league with this name already exists'
            return JsonResponse(message)
        league = League.objects.create(**data)
        league.users.add(data['owner'])
        league.save()
        message['message'] = 'League created successfully with league id: ' + str(league.id)
        message['success'] = True
        message['id'] = str(league.id)
    return JsonResponse(message)

@csrf_exempt
def join_league(request):
    message = {'message': '', 'success': False, 'id': None}
    if request.method == 'POST':
        data = json.loads(request.body)
        league_id = data['league-id']
        user = User.objects.get(id=data['user'])
        print(data)
        if (not league_id):
            message['message'] = 'Code is required'
            return JsonResponse(message)
        if not League.objects.filter(id=league_id):
            message['message'] = 'Invalid Code'
            return JsonResponse(message)
        league = League.objects.get(id=league_id)
        if league.users.filter(id=user.id):
            message['message'] = 'You are already in this league'
            return JsonResponse(message)
        league.users.add(data['user'])
        league.save()
        message['message'] = 'Joined league ' + str(league_id) + ' successfully'
        message['success'] = True
        message['id'] = str(league.id)
    return JsonResponse(message)
