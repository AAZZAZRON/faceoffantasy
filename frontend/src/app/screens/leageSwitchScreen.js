import React from 'react';

import "../../css/leagueSwitchScreen.css";

export default function LeagueSwitchScreen(props) {
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
