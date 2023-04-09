from player.models import NHLTeam, Skater, Goalie, Position
import requests
from lyonhacks3 import config


def updatePlayers():
    Skater.objects.all().delete()
    Goalie.objects.all().delete()
    for team in NHLTeam.objects.all():
        response = requests.get(f"https://statsapi.web.nhl.com/api/v1/teams/{team.id}/roster")
        if response.status_code != 200:
            print("Error: status code", response.status_code)

        for player in response.json()["roster"]:
            player_response = requests.get(f"https://statsapi.web.nhl.com/api/v1/people/{player['person']['id']}")
            if player_response.status_code != 200:
                print("Error: status code", response.status_code)
            player_response = player_response.json()["people"][0]

            player_stats_response = requests.get(f"https://statsapi.web.nhl.com/api/v1/people/{player['person']['id']}/stats?stats={config.stats}&season={config.season}")

            if player_response["primaryPosition"]["code"] == "G":
                try:
                    player_stats = player_stats_response.json()["stats"][0]["splits"][0]["stat"]
                except:
                    player_stats = {
                        "timeOnIce": "0:00",
                        "ot": 0,
                        "shutouts": 0,
                        "wins": 0,
                        "losses": 0,
                        "ties": 0,
                        "saves": 0,
                        "powerPlaySaves": 0,
                        "shortHandedSaves": 0,
                        "evenSaves": 0,
                        "shortHandedShots": 0,
                        "evenShots": 0,
                        "powerPlayShots": 0,
                        "savePercentage": 0,
                        "goalAgainstAverage": 0,
                        "games": 0,
                        "gamesStarted": 0,
                        "shotsAgainst": 0,
                        "goalsAgainst": 0,
                        "powerPlaySavePercentage": 0,
                        "shortHandedSavePercentage": 0,
                        "evenStrengthSavePercentage": 0,
                        "timeOnIcePerGame": "0:00",
                    }
                try:
                    Goalie.objects.create(
                        id=player_response["id"],
                        avatar=f"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{player_response['id']}.jpg",
                        firstName=player_response["firstName"],
                        lastName=player_response["lastName"],
                        primaryNumber=(0 if not "primaryNumber" in player_response else player_response["primaryNumber"]),
                        currentAge=player_response["currentAge"],
                        nationality=player_response["nationality"],
                        height=player_response["height"],
                        weight=player_response["weight"],
                        alternateCaptain=player_response["alternateCaptain"],
                        captain=player_response["captain"],
                        rookie=player_response["rookie"],
                        shootsCatches=player_response["shootsCatches"],
                        rosterStatus=player_response["rosterStatus"],
                        currentTeam=team,
                        primaryPosition=Position.objects.filter(code=player_response["primaryPosition"]["code"])[0],
                        timeOnIce=player_stats["timeOnIce"],
                        ot=player_stats["ot"],
                        shutouts=player_stats["shutouts"],
                        wins=player_stats["wins"],
                        losses=player_stats["losses"],
                        saves=player_stats["saves"],
                        savePercentage=player_stats["savePercentage"],
                        goalAgainstAverage=player_stats["goalAgainstAverage"],
                        games=player_stats["games"],
                        gamesStarted=player_stats["gamesStarted"],
                        shotsAgainst=player_stats["shotsAgainst"],
                        goalsAgainst=player_stats["goalsAgainst"],
                        timeOnIcePerGame=player_stats["timeOnIcePerGame"],
                    )
                except:
                    print("Error: goalie", player_response["firstName"], player_response["lastName"], player_response["id"], "could not be created")
            else:
                if player_stats_response.status_code != 200:
                    print("Error: status code", response.status_code)
                try:
                    player_stats = player_stats_response.json()["stats"][0]["splits"][0]["stat"]
                except:
                    player_stats = {
                        "timeOnIce": "0:00",
                        "assists": 0,
                        "goals": 0,
                        "pim": 0,
                        "shots": 0,
                        "games": 0,
                        "hits": 0,
                        "powerPlayGoals": 0,
                        "powerPlayPoints": 0,
                        "penaltyMinutes": "0:00",
                        "faceOffPct": 0,
                        "shotPct": 0,
                        "gameWinningGoals": 0,
                        "overTimeGoals": 0,
                        "shortHandedGoals": 0,
                        "shortHandedPoints": 0,
                        "blocked": 0,
                        "plusMinus": 0,
                        "points": 0,
                        "timeOnIcePerGame": "0:00",
                    }
                try:
                    Skater.objects.create(
                        id=player_response["id"],
                        avatar=f"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{player_response['id']}.jpg",
                        firstName=player_response["firstName"],
                        lastName=player_response["lastName"],
                        primaryNumber=player_response["primaryNumber"],
                        currentAge=player_response["currentAge"],
                        nationality=player_response["nationality"],
                        height=player_response["height"],
                        weight=player_response["weight"],
                        alternateCaptain=player_response["alternateCaptain"],
                        captain=player_response["captain"],
                        rookie=player_response["rookie"],
                        shootsCatches=player_response["shootsCatches"],
                        rosterStatus=player_response["rosterStatus"],
                        currentTeam=team,
                        primaryPosition=Position.objects.filter(code=player_response["primaryPosition"]["code"])[0],
                        timeOnIce=player_stats["timeOnIce"],
                        assists=player_stats["assists"],
                        goals=player_stats["goals"],
                        pim=player_stats["pim"],
                        shots=player_stats["shots"],
                        games=player_stats["games"],
                        hits=player_stats["hits"],
                        powerPlayGoals=player_stats["powerPlayGoals"],
                        powerPlayPoints=player_stats["powerPlayPoints"],
                        penaltyMinutes=player_stats["penaltyMinutes"],
                        faceOffPct=player_stats["faceOffPct"],
                        shotPct=player_stats["shotPct"],
                        gameWinningGoals=player_stats["gameWinningGoals"],
                        overTimeGoals=player_stats["overTimeGoals"],
                        shortHandedGoals=player_stats["shortHandedGoals"],
                        shortHandedPoints=player_stats["shortHandedPoints"],
                        blocked=player_stats["blocked"],
                        plusMinus=player_stats["plusMinus"],
                        points=player_stats["points"],
                        timeOnIcePerGame=player_stats["timeOnIcePerGame"],
                    )
                except:
                    print("Error: skater", player_response["firstName"], player_response["lastName"], player_response["id"], "could not be created")

        print(team.name, "roster updated")
