from django.db import models
from .users import Hockey_User
from players.models import Player

class Team(models.Model):
    user = models.ForeignKey(Hockey_User, on_delete=models.CASCADE)
    league = models.ForeignKey("League", on_delete=models.CASCADE)
    players = models.ManyToManyField(Player)

class League(models.Model):
    name = models.CharField(max_length=30)
    def player_score(self, player: Player):
        return player.assists
    def team_score(self, team: Team):
        return sum([self.player_score(i) for i in team.players.all()])
    def sorted_teams(self):
        return reversed(sorted(Team.objects.filter(league_id=self.id), key=self.team_score))
