import json
from rest_framework import viewsets
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

class UserView(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@csrf_exempt
def signup(request):
    message = {'message': '', 'success': False}
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        username = data['username']
        password = data['password']
        password2 = data['password2']
        if (not password) or password != password2:
            message['message'] = 'Passwords do not match'
            return JsonResponse(message)
        if (not email) or User.objects.filter(email=email):
            message['message'] = 'An account with this email already exists'
            return JsonResponse(message)
        if (not username) or User.objects.filter(username=username):
            message['message'] = 'An account with this username already exists'
            return JsonResponse(message)
        user = User.objects.create_user(email=email, username=username, password=password)
        user.save()
        message['message'] = 'Account created successfully'
        message['success'] = True
    return JsonResponse(message)