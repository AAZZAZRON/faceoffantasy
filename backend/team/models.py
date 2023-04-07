from django.db import models
import uuid

# Create your models here.
class Team(models.Model):
    teamName = models.CharField(max_length=200)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='owner')

    league = models.ForeignKey('league.League', on_delete=models.CASCADE, related_name='league')

    forwards = models.ManyToManyField('players.Player', related_name='forwards')
    defensemen = models.ManyToManyField('players.Player', related_name='defensemen')
    goalies = models.ManyToManyField('players.Player', related_name='goalies')
