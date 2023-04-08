import React, {useEffect, useState} from "react";
import "../../css/homeScreen.css";
import {SessionContext} from "../utils/sessions";

const HomeLeague = ({session}) => {
    const [rank, setRank] = useState("");
    const [score, setScore] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setRank("53");
            setScore("100");
        }, 1000);
    }, [])

    return <>
        <div style={{padding: "1.5em", display: "flex", flexDirection: "column", height: "100%"}}>
            <p>League</p>
            <div style={{display: "flex", width: "100%"}}>
                <div style={{flexGrow: "1", alignContent: "center"}}>
                    <p>Rank</p>
                    <div style={{marginLeft: "10px"}}>{rank === "" ? <p>Loading</p> : <p>{rank}</p>}</div>
                </div>
                <div style={{flexGrow: "1"}}>
                    <p>Total Points</p>
                    <div style={{marginLeft: "10px"}}>{score === "" ? <p>Loading</p> : <p>{score}</p>}</div>
                </div>
            </div>
            <span style={{borderBottom: "solid 1px grey", width: "100%"}}></span>
            <div style={{marginTop: "auto", display: "flex"}}>
                <div style={{flexGrow: "1"}}>
                    <p>Trade Time</p>
                    <p>5:13 PM</p>
                </div>
                <div style={{flexGrow: "1"}}>
                    <p>Trade Date</p>
                    <p>April 8, 2023</p>
                </div>
            </div>
        </div>
    </>
}

export default function HomeScreen (props) {

    props.setMessage("Hello, <user>!");
    const session = React.useContext(SessionContext);
    console.log(session);

    return (
        <>
            <div className="col-7 h-100">
                <div className="cur-team h-100">
                    <span className="align-middle text-center">My Team</span>
                </div>
            </div>
            <div className="col-5 h-100 d-flex flex-column justify-content-between">
                <div className="watchlist">
                    Watchlist
                </div>
                <div className="league align-bottom">
                    <HomeLeague session={session}></HomeLeague>
                </div>
            </div>
        </>
    );
}
