export const PlayerPoints = (player, league) => {
    let points = 0;
    points += (player.assists ? player.assists : 0) * parseFloat(league.assists);
    points += (player.goals ? player.goals : 0) * parseFloat(league.goals);
    points += (player.saves ? player.saves : 0) * parseFloat(league.saves);
    points += (player.shots ? player.shots : 0) * parseFloat(league.shots);
    points += (player.blocked ? player.blocked : 0) * parseFloat(league.blocked);
    points += (player.goalsAgainst ? player.goalsAgainst : 0) * parseFloat(league.goalsAgainst);
    points += (player.hits ? player.hits : 0) * parseFloat(league.hits);
    points += (player.losses ? player.losses : 0) * parseFloat(league.losses);
    points += (player.wins ? player.wins : 0) * parseFloat(league.wins);
    points += (player.shutouts ? player.shutouts : 0) * parseFloat(league.shutouts);
    points += (player.pim ? player.pim : 0) * parseFloat(league.pim);
    points += (player.ot ? player.ot : 0) * parseFloat(league.ot);
    points += (player.powerPlayPoints ? player.powerPlayPoints : 0) * parseFloat(league.powerPlayPoints);
    points += (player.shortHandedPoints ? player.shortHandedPoints : 0) * parseFloat(league.shortHandedPoints);
    return points.toFixed(1);
}

export const PlayerPointsById = (playerId, allSkatGoal, league) => {
    console.log(allSkatGoal);
    return PlayerPoints(allSkatGoal.find(p => p.id === playerId), league);
}

export const TeamPoints = (team, allSkatGoal, league) => {
    let points = 0;
    for(let i = 0; i < team.players.length; i++) {
        points += PlayerPointsById(team.players[i], allSkatGoal, league);
    }
    for(let i = 0; i < team.goalies.length; i++) {
        points += PlayerPointsById(team.goalies[i], allSkatGoal, league);
    }
    return points;
}

export const TeamPointsById = (teamId, allSkatGoal, teams, league) => {
    const team = teams.find(t => t.id === teamId);
    return TeamPoints(team, allSkatGoal, league);
}