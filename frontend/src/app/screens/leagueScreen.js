import React from 'react';

import "../../css/leagueScreen.css";
import {loggedIn} from "../utils/AuthService";

const colors = {
    1: "#FFD700",
    2: "#C0C0C0",
    3: "#CD7F32",
    4: "#D3D3D3",
}

export default function LeagueScreen (props) {

    if(!loggedIn()) {
        window.location.href = "/lyonhacks3/login";
    }

    props.setMessage("Standings for <League Name>");
    return (
        <div className="league-container">
            <div>Standings as of date</div>
            <TeamCard place={1} name={"Boston Bruins"} points={120.45}></TeamCard>
            <TeamCard place={2} name={"Toronto Maple Leafs"} points={101.99}></TeamCard>
            <TeamCard place={3} name={"Edmonton Oilers"} points={97.3}></TeamCard>
            <TeamCard place={4} name={"New Jersey Devils"} points={89.53}></TeamCard>
        </div>
    );
}

function TeamCard(props) {
    return (
        <div className={"team-card"}>
            <div className={"team-place-info"}>
                <div className={"circle-text"} style={{backgroundColor: (props.place <= 3) ? colors[props.place] : colors[4]}}>{props.place}</div>
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.name}</div>
            </div>
            <div style={{fontSize: "1.5em"}}>{props.points} pts</div>
        </div>
    )
}