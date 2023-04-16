import React from 'react';

import { useSelector } from "react-redux";

import "../../css/leagueScreen.css";
import { TeamPoints } from '../utils/calculator';

const colors = {
    1: "#FFD700",
    2: "#C0C0C0",
    3: "#CD7F32",
    4: "#F1F1F1",
}

export default function LeagueScreen (props) {

    const currentTeam = useSelector((state) => state.teams.currentTeam);
    const currentLeague = useSelector((state) => state.leagues.currentLeague);
    const allTeams = useSelector((state) => state.teams.allTeams);
    const allSkaters = useSelector((state) => state.nhl.skaters);
    const allGoalies = useSelector((state) => state.nhl.goalies);

    // sort currentLeague.team by points
    const sortedTeamIds = currentLeague.teams.slice().sort((a, b) => {
        const aTeam = allTeams.find((team) => team.id === a);
        const bTeam = allTeams.find((team) => team.id === b);
        const aTeamPoints = TeamPoints(aTeam, [...allSkaters, ...allGoalies] , currentLeague);
        const bTeamPoints = TeamPoints(bTeam, [...allSkaters, ...allGoalies] , currentLeague);
        return bTeamPoints - aTeamPoints;
    });
    console.log("sorted team ids: " + sortedTeamIds);

    props.setMessage(`Standings for ${currentLeague.name}`);
    return (
        <div className="league-container">
            <h3>{`${currentLeague.name}: Standings as of ${new Date().toLocaleDateString()}`}</h3>

            {sortedTeamIds.map((teamId, index) => {
                const team = allTeams.find((team) => team.id === teamId);
                const teamPoints = TeamPoints(team, [...allSkaters, ...allGoalies] , currentLeague).toFixed(1);
                return (
                    <TeamCard place={index + 1} name={team.teamName} points={teamPoints} self={currentTeam.id === team.id}></TeamCard>
                )
            })}
        </div>
    );
}

function TeamCard(props) {
    return (
        <div className={"team-card"} style={{backgroundColor: props.self ? "#e5ddfd" : "#f1f1f1"}}>
            <div className={"team-place-info"}>
                <div className={"circle-text"} style={{backgroundColor: (props.place <= 3) ? colors[props.place] : colors[4]}}>{props.place}</div>
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.name}</div>
            </div>
            <div style={{fontSize: "1.5em"}}>{props.points} pts</div>
        </div>
    )
}