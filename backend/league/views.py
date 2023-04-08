from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *

# Create your views here.

class LeagueView(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
