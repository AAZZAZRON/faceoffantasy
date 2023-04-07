import requests
from player.models import Position, NHLTeam

def initPositions():
    response = requests.get(f"https://statsapi.web.nhl.com/api/v1/positions")
    if response.status_code != 200:
        print("Error: status code", response.status_code)

    for position in response.json()[0]:
        Position.objects.create(
            code=position["code"],
            name=position["fullName"],
            type=position["type"],
            abbreviation=position["abbrev"],
        )

def initTeams():
    response = requests.get(f"https://statsapi.web.nhl.com/api/v1/teams")
    if response.status_code != 200:
        print("Error: status code", response.status_code)

    for team in response.json()["teams"]:
        NHLTeam.objects.create(
            id=team["id"],
            name=team["name"],
            link=team["link"],
            venue=team["venue"]["name"],
            abbreviation=team["abbreviation"],
            teamName=team["teamName"],
            locationName=team["locationName"],
            division=team["division"]["name"],
            conference=team["conference"]["name"],
            shortName=team["shortName"],
        )
