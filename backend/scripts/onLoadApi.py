import requests
from player.models import Position, NHLTeam, Skater
from scripts.dailyApiUpdate import updatePlayers, addPlayers
from django.http import HttpResponse
from django.contrib.auth import get_user_model
User = get_user_model()
from dotenv import load_dotenv
import sys
sys.path.append("..")
from user.models import LastUpdated
import os
from faceoffantasy import config
from dateutil import parser

def initialLoad():
    load_dotenv()
    if not User.objects.filter(username=os.environ.get("DJANGO_SUPERUSER_USERNAME")).exists():
        User.objects.create_superuser(
            username=os.environ.get("DJANGO_SUPERUSER_USERNAME"),
            password=os.environ.get("DJANGO_SUPERUSER_PASSWORD"),
        )
    if not Position.objects.all():
        initPositions()
    if not NHLTeam.objects.all():
        initTeams()
    if not Skater.objects.all():
        addPlayers()
    else:
        updatePlayers()
    last_updated = parser.parse(config.last_updated)
    if not LastUpdated.objects.filter(id=1):
        LastUpdated.objects.create(last_updated=last_updated)
    else:
        LastUpdated.objects.filter(id=1).update(last_updated=last_updated)
    return HttpResponse("Success")

def initPositions():
    Position.objects.all().delete()
    response = requests.get(f"https://statsapi.web.nhl.com/api/v1/positions")
    if response.status_code != 200:
        print("Error: status code", response.status_code)

    for position in response.json():
        Position.objects.create(
            code=position["code"],
            name=position["fullName"],
            type=position["type"],
            abbreviation=position["abbrev"],
        )

def initTeams():
    NHLTeam.objects.all().delete()
    response = requests.get(f"https://statsapi.web.nhl.com/api/v1/teams")
    if response.status_code != 200:
        print("Error: status code", response.status_code)

    for team in response.json()["teams"]:
        NHLTeam.objects.create(
            id=team["id"],
            name=team["name"],
            link=team["link"],
            abbreviation=team["abbreviation"],
            teamName=team["teamName"],
            locationName=team["locationName"],
            division=team["division"]["name"],
            conference=team["conference"]["name"],
            shortName=team["shortName"],
            officialSiteUrl=team["officialSiteUrl"],
        )
