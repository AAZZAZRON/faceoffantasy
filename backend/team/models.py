from django.db import models

# Create your models here.
class Team(models.Model):
    teamName = models.CharField(max_length=200)

    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='owner')

    league = models.ForeignKey('league.League', on_delete=models.CASCADE, related_name='league')

    forwards = models.ForeignKey('players.Player', on_delete=models.CASCADE, related_name='forward')
    defensemen = models.ForeignKey('players.Player', on_delete=models.CASCADE, related_name='defensemen')
    goalies = models.ForeignKey('players.Player', on_delete=models.CASCADE, related_name='goalies')

