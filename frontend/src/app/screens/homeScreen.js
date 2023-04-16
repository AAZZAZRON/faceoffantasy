import React, {useEffect, useState} from "react";
import "../../css/homeScreen.css";
import { getUser } from "../utils/AuthService";
import Routes from "../utils/routes";
import {HeadShot} from "../components/playerCards";
import { useSelector } from "react-redux";

const HomeLeague = ({user}) => {
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

const HomeTeam = ({team, skaters, goalies, positions}) => {
    console.log(team, team.forwards)

    const cardGroupStyle = {
        display: "flex", 
        flexDirection: "column", 
        marginLeft: "1em",
        marginRight: "1em"
    };

    const headShotStyle = {
        marginBottom: "1em", 
        borderRadius: "10px", 
        boxShadow: "grey 2px 2px 5px"
    };

    function mapToHeadshot(player) {
        return (
        <div style={headShotStyle}>
            <HeadShot key={player.id} player={player} team={team} 
                position={positions.find(position => position.id === player.primaryPosition)} 
                setModal={() => {}}>
            </HeadShot>
        </div>);
    }

    return (
        <div style={{padding: "5px", textAlign: "left", overflowY: "auto", height: "100%"}}>
            <span style={{textAlign: "center"}}><h5>{team ? team.teamName : "No Team"}</h5></span>
            <p>Forwards</p>
            <div className="card-group" style={cardGroupStyle}>
                {team && skaters.filter(player => team.forwards.some(id => id === player.id)).map(mapToHeadshot)}
            </div>
            <p>Defensemen</p>
            <div className="card-group" style={cardGroupStyle}>
                {team && skaters.filter(player => team.defensemen.some(id => id === player.id)).map(mapToHeadshot)}
            </div>
            <p>Goalies</p>
            <div className="card-group" style={cardGroupStyle}>
                {team && goalies.filter(player => team.goalies.some(id => id === player.id)).map(mapToHeadshot)}
            </div>
        </div>
    )
}

export default function HomeScreen (props) {
    const user = useSelector(state => state.users.currentUser);
    if(user === null) console.log("logged in but no user...");
    else props.setMessage("Hello, " + user["username"] + "!");

    const allSkaters = useSelector(state => state.nhl.skaters);
    const allGoalies = useSelector(state => state.nhl.goalies);
    const positions = useSelector(state => state.nhl.positions);
    const NHLTeams = useSelector(state => state.nhl.nhlteams);
    const team = useSelector(state => state.teams.currentTeam);

    if (user === null) {
        //window.location.href = '/faceoffantasy/login';
        console.log("redirecting from home to login");
        return;
    }

    if (team === null) {
        window.location.href = '/faceoffantasy/switchforce';
        return;
    }

    return (
        <>
            <div className="col-7 h-100">
                <div className="cur-team h-100">
                    <span className="align-middle text-center">
                        <HomeTeam team={team} skaters={allSkaters} goalies={allGoalies} positions={positions}></HomeTeam>
                    </span>
                </div>
            </div>
            <div className="col-5 h-100 d-flex flex-column justify-content-between">
                <div className="watchlist">
                    Watchlist
                </div>
                <div className="league align-bottom">
                    <HomeLeague user={user}></HomeLeague>
                </div>
            </div>
        </>
    );
}
