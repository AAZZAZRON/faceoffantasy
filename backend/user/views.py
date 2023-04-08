from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *

# Create your views here.

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
