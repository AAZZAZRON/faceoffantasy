from rest_framework import viewsets
from .serializers import *
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import sys
sys.path.append("..")
from league.models import League
from django.contrib.auth import get_user_model
User = get_user_model()
from player.models import Skater, Goalie

# Create your views here.

class TeamView(viewsets.ReadOnlyModelViewSet):
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
        if Team.objects.filter(league=league).filter(teamName=data['name']):
            message['message'] = 'A team with this name already exists'
            return JsonResponse(message)
        team = Team(teamName=data['name'])
        team.league = league
        team.save()
        owner = User.objects.get(id=data['owner']) # add team to owner
        owner.teams.add(team)
        owner.save()
        league.teams.add(team) # add team to league
        league.save()
        message['message'] = 'Team created successfully'
        message['success'] = True
    return JsonResponse(message)

@csrf_exempt
def add_player(request):
    message = {'message': '', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)

        player = Skater.objects.filter(id=data['playerId']).first() or Goalie.objects.filter(id=data['playerId']).first()
        if not player:
            message['message'] = 'Player does not exist'
            return JsonResponse(message)

        team = Team.objects.filter(id=data['teamId']).first()
        if not team:
            message['message'] = 'Team does not exist'
            return JsonResponse(message)
        
        position = data["position"]
        if position not in ["Forward", "Defenseman", "Goalie"]:
            message['message'] = 'Invalid position'
            return JsonResponse(message)

        league = team.league
        assert league
        
        if position == "Forward":
            if team.forwards.count() == league.numForwards:
                message['message'] = 'Team already has maximum number of forwards. Please drop a forward to add another.'
                return JsonResponse(message)
            if player in team.forwards.all():
                message['message'] = 'Player is already in team'
                return JsonResponse(message)
            team.forwards.add(player)
        elif position == "Defenseman":
            if team.defensemen.count() == league.numDefensemen:
                message['message'] = 'Team already has maximum number of defensemen. Please drop a defensemen to add another.'
                return JsonResponse(message)
            if player in team.defensemen.all():
                message['message'] = 'Player is already in team'
                return JsonResponse(message)
            team.defensemen.add(player)
        elif position == "Goalie":
            if team.goalies.count() == league.numGoalies:
                message['message'] = 'Team already has maximum number of goalies. Please drop a goalie to add another.'
                return JsonResponse(message)
            if player in team.goalies.all():
                message['message'] = 'Player is already in team'
                return JsonResponse(message)
            team.goalies.add(player)

        team.save()
        message['message'] = 'Player added successfully'
        message['success'] = True
    return JsonResponse(message)

@csrf_exempt
def drop_player(request):
    message = {'message': '', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)
        player = Skater.objects.filter(id=data['playerId']).first() or Goalie.objects.filter(id=data['playerId']).first()
        if not player:
            message['message'] = 'Player does not exist'
            return JsonResponse(message)
        team = Team.objects.filter(id=data['teamId']).first()
        if not team:
            message['message'] = 'Team does not exist'
            return JsonResponse(message)
        
        # drop player
        print(player)
        if player in team.forwards.all():
            team.forwards.remove(player)
        elif player in team.defensemen.all():
            team.defensemen.remove(player)
        elif player in team.goalies.all():
            team.goalies.remove(player)
        else:
            message['message'] = 'Player is not in team'
            return JsonResponse(message)
        team.save()
        message['message'] = 'Player dropped successfully'
        message['success'] = True
    return JsonResponse(message)