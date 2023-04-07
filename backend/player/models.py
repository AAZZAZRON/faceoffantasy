from django.db import models

class NHLTeam(models.Model):
    # as per https://statsapi.web.nhl.com/api/v1/teams/6
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    link = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=200)
    teamName = models.CharField(max_length=200)
    locationName = models.CharField(max_length=200)
    shortName = models.CharField(max_length=200)
    officialSiteUrl = models.CharField(max_length=200)
    division = models.CharField(max_length=200)
    conference = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Position(models.Model):
    code = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=200)
    def __str__(self):
        return self.type

class Player(models.Model):
    # player info as per https://statsapi.web.nhl.com/api/v1/people/8477956/
    id = models.IntegerField(primary_key=True)
    fullName = models.CharField(max_length=200)
    link = models.CharField(max_length=200)
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)
    primaryNumber = models.CharField(max_length=200)
    birthDate = models.CharField(max_length=200)
    currentAge = models.IntegerField()
    birthCity = models.CharField(max_length=200)
    birthCountry = models.CharField(max_length=200)
    nationality = models.CharField(max_length=200)
    height = models.CharField(max_length=200)
    weight = models.IntegerField()
    active = models.BooleanField()
    alternateCaptain = models.BooleanField()
    captain = models.BooleanField()
    rookie = models.BooleanField()
    shootsCatches = models.CharField(max_length=200)
    rosterStatus = models.CharField(max_length=200)
    currentTeam = models.ForeignKey(NHLTeam, on_delete=models.CASCADE, null=True)
    primaryPosition = models.ForeignKey(Position, on_delete=models.CASCADE, null=True)

    # player stats as per https://statsapi.web.nhl.com/api/v1/people/8477956/stats?stats=statsSingleSeason&season=20222023
    timeOnIce = models.CharField(max_length=200)
    assists = models.IntegerField()
    goals = models.IntegerField()
    pim = models.IntegerField()
    shots = models.IntegerField()
    games = models.IntegerField()
    hits = models.IntegerField()
    powerPlayGoals = models.IntegerField()
    powerPlayPoints = models.IntegerField()
    powerPlayTimeOnIce = models.CharField(max_length=200)
    evenTimeOnIce = models.CharField(max_length=200)
    penaltyMinutes = models.CharField(max_length=200)
    faceOffPct = models.FloatField()
    shotPct = models.FloatField()
    gameWinningGoals = models.IntegerField()
    overTimeGoals = models.IntegerField()
    shortHandedGoals = models.IntegerField()
    shortHandedPoints = models.IntegerField()
    shortHandedTimeOnIce = models.CharField(max_length=200)
    blocked = models.IntegerField()
    plusMinus = models.IntegerField()
    points = models.IntegerField()
    shifts = models.IntegerField()
    timeOnIcePerGame = models.CharField(max_length=200)
    evenTimeOnIcePerGame = models.CharField(max_length=200)
    shortHandedTimeOnIcePerGame = models.CharField(max_length=200)
    powerPlayTimeOnIcePerGame = models.CharField(max_length=200)

    def __str__(self):
        return self.firstName + ' ' + self.lastName
