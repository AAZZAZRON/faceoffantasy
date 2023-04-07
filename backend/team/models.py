from django.db import models
from player.models import Player

import uuid

# Create your models here.
class Team(models.Model):
    teamName = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    league = models.ForeignKey('league.League', on_delete=models.CASCADE, related_name='league')

    forwards = models.ManyToManyField(Player, related_name='forwards')
    defensemen = models.ManyToManyField(Player, related_name='defensemen')
    goalies = models.ManyToManyField(Player, related_name='goalies')
