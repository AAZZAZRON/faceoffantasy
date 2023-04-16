import React from 'react';

import "../../css/leagueSwitchScreen.css";
import { LeagueCreationModal, LeagueJoinModal } from '../components/leagueAddModals';

import { useSelector, useDispatch } from "react-redux";
import { setCurrentLeagueId } from '../features/leagues';
import { setCurrentTeamId } from '../features/teams';
import { setGoTo, setLoaded } from '../features/loaded';
import {toast} from 'react-toastify';

import { IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function LeagueSwitchScreen(props) {

    const allUsers = useSelector((state) => state.users.allUsers);
    const currentUser = useSelector((state) => state.users.currentUser);
    const currentTeam = useSelector((state) => state.teams.currentTeam);
    const userLeagues = useSelector((state) => state.leagues.myLeagues);
    const userTeams = useSelector((state) => state.teams.myTeams);

    const dispatch = useDispatch();

    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);
    const [showLeagueJoinModal, setShowLeagueJoinModal] = React.useState(false);

    props.setMessage("My leagues");

    async function handleClick(team) {
        const league = userLeagues.find((league) => league.id === team.league);
        dispatch(setCurrentLeagueId(league.id));
        dispatch(setCurrentTeamId(team.id));
        if (props.force) dispatch(setGoTo("/faceoffantasy/"));
        dispatch(setLoaded(false));
    }

    return (<>
        <LeagueCreationModal
        showLeagueCreationModal={showLeagueCreationModal}
        setShowLeagueCreationModal={setShowLeagueCreationModal}>
        </LeagueCreationModal>
        <LeagueJoinModal
        showLeagueJoinModal={showLeagueJoinModal}
        setShowLeagueJoinModal={setShowLeagueJoinModal}>
        </LeagueJoinModal>
        <div className={"league-container"}>
            <div className={"create-join-league-top-bar"}>
                <h2>{props.force ? 
                    'Hello, ' + (currentUser && currentUser.username) + '! Please Select a League to Continue.' :
                    'Select a League'}
                </h2>
                <div className={"enter-league-buttons"}>

                    <button className={"enter-league-button"}
                    style={{fontWeight: "bold"}}
                    onClick={() => setShowLeagueJoinModal(true)}>
                    Join League
                    </button>

                    <button className={"enter-league-button"}
                    style={{fontWeight: "bold", backgroundColor: "#add8e6"}}
                    onClick={() => setShowLeagueCreationModal(true)}>
                    Create League
                    </button>
                    
                </div>
            </div>
            <hr style={{width: "95%"}}/>

            {
            userLeagues && 
            <div className={"league-cards-container"}>
                {userTeams.map((team, index) => {
                    if (userLeagues === undefined) return (<></>); // dont error
                    return ( 
                    <LeagueCard
                    key={index}
                    team={team}
                    leagueOwner={allUsers.find((user) => user.id === userLeagues.find((league) => league.id === team.league).owner).username}
                    league={userLeagues.find((league) => league.id === team.league)}
                    selected={(currentTeam && currentTeam.league === team.league)}
                    handleClick={() => {handleClick(team)}}
                    ></LeagueCard>
                )})}
            </div>
            }

        </div> 
    </>);
}

function LeagueCard(props) {
    console.log(JSON.stringify(props.league.isDrafted));
    return (<>
        <div className={"league-card"} style={{backgroundColor: (props.selected) ? "#e5ddfd" : "#f1f1f1"}} onClick={props.handleClick}>
            <div className={"league-place-info"}>   
                <div style={{fontSize: "1.5em", fontWeight: "bold"}}>{props.league.name}</div>
                <div>{props.league.users.length} team{props.league.users.length === 1 ? "" : "s"}</div>
            </div>
            <div className={"league-team-details"}>
                <div className={"league-detail"}>Status: {props.league.isDrafted ? "drafted" : "undrafted"}</div>
                <div className={"league-detail"}>League Owner: {props.leagueOwner}</div>
                <div className={"league-detail"}>Your Team: {props.team.teamName} ({props.team.abbreviation})</div>
                <div className={"league-detail"}>
                    <div style={{marginRight: "0.5%"}}>League ID: {props.league.id}</div>
                    <IconButton
                    onClick={(clickevent) => {
                        navigator.clipboard.writeText(props.league.id);
                        clickevent.stopPropagation();
                        toast.success("League ID copied to clipboard!")}}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </div>
            </div>
        </div>

    </>)
}

