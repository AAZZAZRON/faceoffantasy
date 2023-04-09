from django.contrib import admin
from django.urls import path, include
from player import views as player_views
from league import views as league_views
from team import views as team_views
from user import views as user_views
from rest_framework import routers

from django.conf import settings
from django.conf.urls.static import static

from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView

from scripts.onLoadApi import initialLoad

router = routers.DefaultRouter()
router.register(r'skaters', player_views.SkaterView, 'skaters')
router.register(r'goalies', player_views.GoalieView, 'goalies')
router.register(r'nhlteams', player_views.NHLTeamView, 'nhlteams')
router.register(r'positions', player_views.PositionView, 'positions')
router.register(r'leagues', league_views.LeagueView, 'leagues')
router.register(r'users', user_views.UserView, 'users')
router.register(r'teams', team_views.TeamView, 'teams')

urlpatterns = [
    path('api/signup/', user_views.signup, name='signup'),
    path('api/countplayers/', player_views.countPlayers, name='countPlayers'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/createleague/', league_views.create_league, name='create_league'),
    path('api/createteam/', team_views.create_team, name='create_team'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)