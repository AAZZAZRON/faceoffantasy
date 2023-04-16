import './css/App.css';
import Base from './app/base';
import "./css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { setGoTo, setLoaded } from './app/features/loaded';
import { setSkaters, setGoalies, setPositions, setNHLTeams } from './app/features/nhl';
import { setAllLeagues, setMyLeagues, setCurrentLeague } from './app/features/leagues';
import { setAllTeams, setMyTeams, setCurrentTeam } from './app/features/teams';
import { setAllUsers, setCurrentUser } from './app/features/users';
import Routes from './app/utils/routes';
import { callAPI } from './app/utils/callApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  var currentUser = useSelector((state) => state.users.currentUser);
  const currentTeamId = useSelector((state) => state.teams.currentTeamId);
  const currentLeagueId = useSelector((state) => state.leagues.currentLeagueId);
  const loaded = useSelector((state) => state.loaded.value);
  const goTo = useSelector((state) => state.loaded.goTo);
  const [linkTo, setLinkTo] = useState("");

  const loadResources = async () => {
    console.log("!", isLoggedIn);
    if (isLoggedIn) {
      await callAPI(`${Routes.USER}/${currentUser.id}/`).then((json) => {
        dispatch(setCurrentUser(json));
        currentUser = json; // make sure to update currentUser
        console.log("Current User:" + JSON.stringify(currentUser));
      })
    }

    await callAPI(`${Routes.USER}/`).then((data) => { // all users
      dispatch(setAllUsers(data));
    });

    await callAPI(`${Routes.LEAGUES}/`).then((data) => { // all leagues
      dispatch(setAllLeagues(data));
      if (isLoggedIn) {
        const myLeagues = data.filter((league) => league.users.includes(currentUser.id));
        dispatch(setMyLeagues(myLeagues));
        if (currentLeagueId !== null) {
          const currentLeague = myLeagues.find((league) => league.id === currentLeagueId);
          dispatch(setCurrentLeague(currentLeague));
        }
      }
    });

    await callAPI(`${Routes.TEAMS}/`).then((data) => { // all teams
      console.log("!", data);
      dispatch(setAllTeams(data));
      if (isLoggedIn) {
        const myTeams = data.filter((team) => currentUser.teams.includes(team.id));
        dispatch(setMyTeams(myTeams));
        if (currentTeamId !== null) {
          const currentTeam = myTeams.find((team) => team.id === currentTeamId);
          dispatch(setCurrentTeam(currentTeam));
        }
      }
    });

    await callAPI(`${Routes.SKATERS}/`).then((data) => { // all skaters
        dispatch(setSkaters(data));
    });

    await callAPI(`${Routes.GOALIES}/`).then((data) => { // all goalies
        dispatch(setGoalies(data));
    });

    await callAPI(`${Routes.POSITIONS}/`).then((data) => { // all positions
        dispatch(setPositions(data));
    });

    await callAPI(`${Routes.NHLTEAMS}/`).then((data) => { // all nhl teams
        dispatch(setNHLTeams(data));
    });

    if (goTo !== null) {
      setLinkTo(goTo);
      dispatch(setGoTo(null));
    }
  }
  
  if (loaded === false) { // if loaded
    toast.info("loading db...");
    dispatch(setLoaded(true));
    loadResources().then(() => {
      toast.success("db loaded!");
    });
  }

  useEffect(() => {
    if (linkTo !== "") {
      toast.info("redirecting...");
      let tmp = linkTo;
      setLinkTo("");
      window.location.href = tmp;
    }
  }, [linkTo]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Base></Base>
    </>
  );
}

export default App;
