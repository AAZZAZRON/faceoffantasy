from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *

# Create your views here.

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
