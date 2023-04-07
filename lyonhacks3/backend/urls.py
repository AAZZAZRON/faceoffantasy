from django.contrib import admin
from django.urls import path, include
from players import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'players', views.PlayerView, 'players')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]
