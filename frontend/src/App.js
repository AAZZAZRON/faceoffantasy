import './css/App.css';
import Base from './app/base';
import "./css/bootstrap.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoaded } from './app/features/loaded';
import { setSkaters, setGoalies, setPositions, setNHLTeams } from './app/features/nhl';
import routes from './app/utils/routes';
import { callAPI } from './app/utils/callApi';

function App() {
  const dispatch = useDispatch();

  const loadResources = () => {
    callAPI(`${routes.SKATERS}/`).then((data) => { // all skaters
        dispatch(setSkaters(data));
    });

    callAPI(`${routes.GOALIES}/`).then((data) => { // all goalies
        dispatch(setGoalies(data));
    });

    callAPI(`${routes.POSITIONS}/`).then((data) => { // all positions
        dispatch(setPositions(data));
    });

    callAPI(`${routes.NHLTEAMS}/`).then((data) => { // all nhl teams
        dispatch(setNHLTeams(data));
    });
  }
  
  const loaded = useSelector((state) => state.loaded.value);
  if (loaded === false) { // if loaded
    loadResources();
    dispatch(setLoaded(true));
  }

  return (
    <Base></Base>
  );
}

export default App;
