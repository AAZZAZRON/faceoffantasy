import requests
from player.models import Position, NHLTeam, Skater
from scripts.dailyApiUpdate import updatePlayers
from django.http import HttpResponse

def initialLoad(request):
    if not Skater.objects.all():
        initPositions()
        initTeams()
        updatePlayers()
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
