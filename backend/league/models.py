from django.db import models
import uuid
    
class League(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    users = models.ManyToManyField('user.User', related_name='users')
    owner = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='owner')
    teams = models.ManyToManyField('team.Team', related_name='teams', blank=True)
    isDrafted = models.BooleanField(default=False)

    # number per team
    numForwards = models.IntegerField()
    numDefensemen = models.IntegerField()
    numGoalies = models.IntegerField()

    # skater point values
    goals = models.DecimalField(max_digits=4, decimal_places=1)
    assists = models.DecimalField(max_digits=4, decimal_places=1)
    pim = models.DecimalField(max_digits=4, decimal_places=1)
    shots = models.DecimalField(max_digits=4, decimal_places=1)
    hits = models.DecimalField(max_digits=4, decimal_places=1)
    powerPlayPoints = models.DecimalField(max_digits=4, decimal_places=1)
    shortHandedPoints = models.DecimalField(max_digits=4, decimal_places=1)
    blocked = models.DecimalField(max_digits=4, decimal_places=1)

    # goalie point values
    wins = models.DecimalField(max_digits=4, decimal_places=1)
    losses = models.DecimalField(max_digits=4, decimal_places=1)
    ot = models.DecimalField(max_digits=4, decimal_places=1)
    saves = models.DecimalField(max_digits=4, decimal_places=1)
    shutouts = models.DecimalField(max_digits=4, decimal_places=1)
    goalsAgainst = models.DecimalField(max_digits=4, decimal_places=1)
