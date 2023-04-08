from django.contrib import admin
from django.urls import path, include
from player import views
from rest_framework import routers

from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView

from scripts.onLoadApi import initPositions, initTeams
from scripts.dailyApiUpdate import updatePlayers

router = routers.DefaultRouter()
router.register(r'players', views.PlayerView, 'players')
router.register(r'nhlteams', views.NHLTeamView, 'nhlteams')
router.register(r'positions', views.PositionView, 'positions')

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]

initPositions()
initTeams()
updatePlayers()