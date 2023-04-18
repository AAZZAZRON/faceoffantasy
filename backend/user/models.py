from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import Manager

# Create your models here.

class User(AbstractUser):
    
    # email, username, and password are already defined in AbstractUser
    REQUIRED_FIELDS = []
    
    teams = models.ManyToManyField('team.Team', related_name="teams_owned", blank=True)

    objects = Manager()
    
    def __str__(self):
        return self.username

class LastUpdated(models.Model):
    last_updated = models.DateTimeField()

    class Meta:
        abstract = True