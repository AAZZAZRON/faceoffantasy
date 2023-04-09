from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import Manager

# Create your models here.

class User(AbstractUser):
    
    # email, username, and password are already defined in AbstractUser
    REQUIRED_FIELDS = []
    
    teams = models.JSONField(models.ForeignKey('team.Team', on_delete=models.CASCADE), default=list)

    objects = Manager()
    
    def __str__(self):
        return self.username