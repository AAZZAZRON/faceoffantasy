from rest_framework import viewsets
from .serializers import *
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class LeagueView(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

@csrf_exempt
def create_league(request):
    message = {'message': '', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data['name']
        if (not name):
            message['message'] = 'League name is required'
            return JsonResponse(message)
        if League.objects.filter(name=name):
            message['message'] = 'A league with this name already exists'
            return JsonResponse(message)
        league = League.objects.create(name=name)
        league.save()
        message['message'] = 'League created successfully'
        message['success'] = True
    return JsonResponse(message)