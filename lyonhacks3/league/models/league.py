from django.db import models
from .users import Hockey_User
from players.models import Player

class League(models.Model):
    name = models.CharField(max_length=30)

class Team(models.Model):
    user = models.ForeignKey(Hockey_User, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    players = models.ManyToManyField(Player)