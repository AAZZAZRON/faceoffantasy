import React from 'react';

import { useSelector } from "react-redux";

import "../../css/leagueScreen.css";

const colors = {
    1: "#FFD700",
    2: "#C0C0C0",
    3: "#CD7F32",
    4: "#F1F1F1",
}

export default function LeagueScreen (props) {

    const currentTeam = useSelector((state) => state.teams.currentTeam);
    const currentLeague = useSelector((state) => state.leagues.currentLeague);

    // sort currentLeague.team by points
    let sortedTeams = currentLeague.teams.sort((a, b) => b.points - a.points);
    console.log(sortedTeams);

    props.setMessage(`Standings for ${currentLeague.name}`);
    return (
        <div className="league-container">
            <h3>{`${currentLeague.name}: Standings as of ${new Date().toLocaleDateString()}`}</h3>

            <TeamCard place={1} name={"Boston Bruins"} points={120.45}></TeamCard>
            <TeamCard place={2} name={"Toronto Maple Leafs"} points={101.99} self={true}></TeamCard>
            <TeamCard place={3} name={"Edmonton Oilers"} points={97.3}></TeamCard>
            <TeamCard place={4} name={"New Jersey Devils"} points={89.53}></TeamCard>
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