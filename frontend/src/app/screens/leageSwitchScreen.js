import React from 'react';

import "../../css/leagueSwitchScreen.css";
import {loggedIn} from "../utils/AuthService";

export default function LeagueSwitchScreen(props) {

    if(!loggedIn()) {
        window.location.href = "/lyonhacks3/login";
    }

    function createLeague() {
        // create a modal
        // have a form in the modal
        // have a button in the modal that submits the form
        // have a button in the modal that closes the modal
        // have a button in the modal that redirects to the league page

        console.log("create league");
    }

    props.setMessage("My leagues");
    return (
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>Select a League</h2>
                <div className={"enter-league-buttons"}>
                    <button className={"enter-league-button"} style={{fontWeight: "bold"}}>Join League</button>
                    <button className={"enter-league-button"} style={{fontWeight: "bold", backgroundColor: "#add8e6"}} onClick={createLeague}>Create League</button>
                </div>
            </div>
            <hr style={{width: "95%"}}/>
            <LeagueCard name={"National Hockey League"} playercount={4} active={true}></LeagueCard>
            <LeagueCard name={"Sam's Fantasy League"} playercount={6}></LeagueCard>
            <LeagueCard name={":D"} playercount={8}></LeagueCard>
        </div>
    );
}

function LeagueCard(props) {
    return (
        <div className={"league-card"} style={{backgroundColor: props.active ? "#e5ddfd" : "#f1f1f1"}}>
            <div className={"league-place-info"}>
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.name}</div>

            </div>
            <div>{props.playercount} players</div>
        </div>
    )
}
