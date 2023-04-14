import './css/App.css';
import Base from './app/base';
import "./css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoaded } from './app/features/loaded';
import { setSkaters, setGoalies, setPositions, setNHLTeams } from './app/features/nhl';
import { setAllLeagues, setMyLeagues } from './app/features/leagues';
import { setAllTeams, setMyTeams } from './app/features/teams';
import Routes from './app/utils/routes';
import { callAPI } from './app/utils/callApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const currentUser = useSelector((state) => state.users.currentUser);
  const loaded = useSelector((state) => state.loaded.value);


  const loadResources = () => {
    callAPI(`${Routes.SKATERS}/`).then((data) => { // all skaters
        dispatch(setSkaters(data));
    });

    callAPI(`${Routes.GOALIES}/`).then((data) => { // all goalies
        dispatch(setGoalies(data));
    });

    callAPI(`${Routes.POSITIONS}/`).then((data) => { // all positions
        dispatch(setPositions(data));
    });

    callAPI(`${Routes.NHLTEAMS}/`).then((data) => { // all nhl teams
        dispatch(setNHLTeams(data));
    });

    callAPI(`${Routes.LEAGUES}/`).then((data) => { // all leagues
      dispatch(setAllLeagues(data));
      if (isLoggedIn) {
        const myLeagues = data.filter((league) => league.users.includes(currentUser.id));
        dispatch(setMyLeagues(myLeagues));
      }
    });

    callAPI(`${Routes.TEAMS}/`).then((data) => { // all teams
      dispatch(setAllTeams(data));
      if (isLoggedIn) {
        const myTeams = data.filter((team) => currentUser.teams.includes(team.id));
        dispatch(setMyTeams(myTeams));
      }
    });
  }
  
  if (loaded === false) { // if loaded
    loadResources();
    dispatch(setLoaded(true));
  }

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
