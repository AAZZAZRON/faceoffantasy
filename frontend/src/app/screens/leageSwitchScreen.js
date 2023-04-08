import React from 'react';

import "../../css/leagueSwitchScreen.css";
import {loggedIn} from "../utils/AuthService";

export default function LeagueSwitchScreen(props) {

    if(!loggedIn()) {
        window.location.href = "/lyonhacks3/login";
    }

    props.setMessage("My leagues");
    return (
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>Select a league</h2>
                <hr />
            </div>
        </div>
    );
}
