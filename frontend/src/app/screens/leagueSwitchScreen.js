import React, { useEffect } from 'react';

import "../../css/leagueSwitchScreen.css";
import { getDataCache } from '../utils/api/caching';
import { callAndStore } from '../utils/api/callApi';
import routes from '../utils/misc/routes';
import { setActiveTeam, getActiveTeam, logout, hasActiveTeam, loggedIn } from '../utils/AuthService';
import { LeagueCreationModal, LeagueJoinModal } from '../components/leagueAddModals';

export default function LeagueSwitchScreen(props) {
    
    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);
    const [showLeagueJoinModal, setShowLeagueJoinModal] = React.useState(false);
    const [userTeams, setUserTeams] = React.useState([]);
    const [userLeagues, setUserLeagues] = React.useState([]);
    const [selectedLeagueID, setSelectedLeagueID] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [doneLoading, setDoneLoading] = React.useState(false);

    props.setMessage("My leagues");

    useEffect(() => {
        console.log(userTeams);
        console.log(userLeagues);
    }, [userTeams, userLeagues]);

    const cacheTeamsAndLeagues = async () => {
        if (user === null || user === undefined) return;
        await callAndStore("LEAGUES", `${routes.LEAGUES}/`).then((res) => {setUserLeagues(res)});
        await callAndStore("TEAMS", `${routes.TEAMS}/`).then((res) => {setUserTeams(res)});
    }

    function handleClick(handleclickprops) {
        const league = userLeagues.find((league) => league.id === handleclickprops.league);
        setSelectedLeagueID(league.id);
        setActiveTeam(handleclickprops);
        if (props.force) window.location.href = "/faceoffantasy";
    }

    useEffect(() => {
        cacheTeamsAndLeagues();
      }, [user]);

    useEffect(() => {
        async function cacheUser() {
            if (loggedIn()) {
                setUser(getDataCache("user"));
            }
            if (hasActiveTeam()) setSelectedLeagueID(getActiveTeam().league);
        }
        cacheUser();
        setDoneLoading(true);
    }, []);

    if (!doneLoading) return (<></>);

    return (<>
        <LeagueCreationModal showLeagueCreationModal={showLeagueCreationModal} setShowLeagueCreationModal={setShowLeagueCreationModal} updateTeamsAndLeagues={cacheTeamsAndLeagues}></LeagueCreationModal>
        <LeagueJoinModal showLeagueJoinModal={showLeagueJoinModal} setShowLeagueJoinModal={setShowLeagueJoinModal}></LeagueJoinModal>
        <div className={"league-container"}>
            <div className={"create-join-league-top-bar"}>
                <h2>{props.force ? 'Hello, ' + user.username + '! Please Select a League to Continue.' : 'Select a League'}</h2>
                <div className={"enter-league-buttons"}>
                    <button className={"enter-league-button"} style={{fontWeight: "bold"}} onClick={() => setShowLeagueJoinModal(true)}>Join League</button>
                    <button className={"enter-league-button"} style={{fontWeight: "bold", backgroundColor: "#add8e6"}} onClick={() => setShowLeagueCreationModal(true)}>Create League</button>
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
                    league={userLeagues.find((league) => league.id === team.league)}
                    force={props.force}
                    selected={selectedLeagueID === team.league}
                    handleClick={() => {handleClick(team)}}
                    ></LeagueCard>
                )})}
            </div>
            }

        </div> 
        {props.force && <div style={{width: "10%"}}><button id='logout' onClick={logout}>logout</button></div>}
    </>);
}

function LeagueCard(props) {
    console.log(JSON.stringify(props));
    return (
        <div className={"league-card"} style={{backgroundColor: (props.selected) ? "#e5ddfd" : "#f1f1f1"}} onClick={props.handleClick}>
            <div className={"league-place-info"}>   
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.league.name}</div>

            </div>
            <div>{props.league.users.length} players</div>
        </div>
    )
}

