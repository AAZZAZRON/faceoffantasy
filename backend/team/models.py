from django.db import models
from player.models import Skater, Goalie

import uuid

# Create your models here.
class Team(models.Model):
    teamName = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    league = models.ForeignKey('league.League', on_delete=models.CASCADE, related_name='league')

    forwards = models.ManyToManyField(Skater, related_name='forwards')
    defensemen = models.ManyToManyField(Skater, related_name='defensemen')
    goalies = models.ManyToManyField(Goalie, related_name='goalies')
