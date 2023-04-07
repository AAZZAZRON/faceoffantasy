from django.db import models
from django.contrib.auth.models import User
import uuid

class League(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    users = models.ManyToManyField(User, related_name='leagues')

    # number per team
    numForwards = models.IntegerField()
    numDefensemen = models.IntegerField()
    numGoalies = models.IntegerField()

    # skater point values
    goals = models.IntegerField()
    assists = models.IntegerField()
    pim = models.IntegerField()
    shots = models.IntegerField()
    hits = models.IntegerField()
    powerPlayPoints = models.IntegerField()
    shortHandedPoints = models.IntegerField()
    blocked = models.IntegerField()

    # goalie point values
    wins = models.IntegerField()
    losses = models.IntegerField()
    ot = models.IntegerField()
    saves = models.IntegerField()
    shutouts = models.IntegerField()
    goalsAgainst = models.IntegerField()

