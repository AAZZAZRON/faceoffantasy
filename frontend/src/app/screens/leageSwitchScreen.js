import React from 'react';

import "../../css/leagueSwitchScreen.css";

export default function LeagueSwitchScreen(props) {
    props.setMessage("My leagues");
    return (
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>Select a League</h2>
                <div className={"enter-league-buttons"}>
                    <button className={"enter-league-button"}>Join league</button>
                    <button className={"enter-league-button"} style={{backgroundColor: "#add8e6"}}>Create league</button>
                </div>
            </div>
            <hr style={{width: "95%"}}/>
        </div>
    );
}
