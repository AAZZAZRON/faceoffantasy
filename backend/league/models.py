from django.db import models
import uuid
    
class League(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    users = models.ManyToManyField('user.User', related_name='users')
    owner = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='owner')
    teams = models.ManyToManyField('team.Team', related_name='teams', blank=True)

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
