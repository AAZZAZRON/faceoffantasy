import sys

from django.contrib import admin
from django.urls import path, include
from player import views as player_views
from league import views as league_views
from team import views as team_views
from user import views as user_views
from rest_framework import routers

from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView

from scripts.onLoadApi import initPositions, initTeams
from scripts.dailyApiUpdate import updatePlayers

router = routers.DefaultRouter()
router.register(r'players', player_views.PlayerView, 'players')
router.register(r'goalies', player_views.GoalieView, 'goalies')
router.register(r'nhlteams', player_views.NHLTeamView, 'nhlteams')
router.register(r'positions', player_views.PositionView, 'positions')
router.register(r'leagues', league_views.LeagueView, 'leagues')
router.register(r'users', user_views.UserView, 'users')
router.register(r'teams', team_views.TeamView, 'teams')

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]

if not 'manage.py' in sys.argv:
    initPositions()
    initTeams()
    updatePlayers()
