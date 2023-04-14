import React, { useEffect } from 'react';

import "../../css/leagueSwitchScreen.css";
import { callAPI } from '../utils/callApi';
import Routes from '../utils/routes';
import { logout } from '../utils/AuthService';
import { LeagueCreationModal, LeagueJoinModal } from '../components/leagueAddModals';

import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, appendTeamToCurrentUser } from '../features/users';
import { setMyLeagues, setCurrentLeague } from '../features/leagues';
import { setMyTeams, setCurrentTeam } from '../features/teams';

export default function LeagueSwitchScreen(props) {
    
    const currentUser = useSelector((state) => state.users.currentUser);
    const currentTeam = useSelector((state) => state.teams.currentTeam);
    const userLeagues = useSelector((state) => state.leagues.myLeagues);
    const userTeams = useSelector((state) => state.teams.myTeams);

    const dispatch = useDispatch();

    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);
    const [showLeagueJoinModal, setShowLeagueJoinModal] = React.useState(false);

    props.setMessage("My leagues");

    const cacheTeamsAndLeagues = async () => {

        callAPI(`${Routes.USER}/${currentUser.id}/`).then((json) => {
            dispatch(setCurrentUser(json));
            console.log("Current User:" + JSON.stringify(currentUser));
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            callAPI(`${Routes.TEAMS}/`).then((json) => {
                console.log("current user's teams: " + currentUser.teams);
                console.log(JSON.stringify(json));
                const myTeams = json.filter((team) => currentUser.teams.includes(team.id));
                console.log("My Teams:" + JSON.stringify(myTeams));
                dispatch(setMyTeams(myTeams));
              }).catch((error) => {
                console.log(error);
              });
        }).catch((error) => {
            console.log(error);
        });

        callAPI(`${Routes.LEAGUES}/`).then((json) => {
            console.log(currentUser);
            console.log(JSON.stringify(json));
            const myLeagues = json.filter((league) => league.users.includes(currentUser.id));
            console.log("My Leagues:" + JSON.stringify(myLeagues));
            dispatch(setMyLeagues(myLeagues));
          }).catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        if (currentUser) cacheTeamsAndLeagues();
    }, []);

    function handleClick(handleclickprops) {
        const league = userLeagues.find((league) => league.id === handleclickprops.league);
        dispatch(setCurrentLeague(league));
        dispatch(setCurrentTeam(handleclickprops));
        if (props.force) window.location.href = "/faceoffantasy";
    }

    return (<>
        <LeagueCreationModal
        showLeagueCreationModal={showLeagueCreationModal}
        setShowLeagueCreationModal={setShowLeagueCreationModal}
        updateTeamsAndLeagues={cacheTeamsAndLeagues}>
        </LeagueCreationModal>
        <LeagueJoinModal
        showLeagueJoinModal={showLeagueJoinModal}
        setShowLeagueJoinModal={setShowLeagueJoinModal}
        updateTeamsAndLeagues={cacheTeamsAndLeagues}>
        </LeagueJoinModal>
        <div className={"league-container"}>
            <div className={"create-join-league-top-bar"}>
                <h2>{props.force ? 'Hello, ' + (currentUser && currentUser.username) + '! Please Select a League to Continue.' : 'Select a League'}</h2>
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
                    league={userLeagues.find((league) => league.id === team.league)}
                    selected={(currentTeam && currentTeam.league === team.league)}
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
    // console.log(JSON.stringify(props));
    return (
        <div className={"league-card"} style={{backgroundColor: (props.selected) ? "#e5ddfd" : "#f1f1f1"}} onClick={props.handleClick}>
            <div className={"league-place-info"}>   
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.league.name}</div>

            </div>
            <div>{props.league.users.length} players</div>
        </div>
    )
}

