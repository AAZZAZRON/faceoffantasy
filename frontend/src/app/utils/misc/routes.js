const BASEURL = "https://faceoffantasy.up.railway.app";
//const BASEURL = "http://127.0.0.1:8000";

const Routes = {
  // auth
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/token`,
    REFRESH: `${BASEURL}/api/token/refresh`,
  },
  POST: {
    SIGNUP: `${BASEURL}/api/signup`,
    CREATELEAGUE: `${BASEURL}/api/createleague`,
    JOINLEAGUE: `${BASEURL}/api/joinleague`,
    CREATETEAM: `${BASEURL}/api/createteam`,
  },
  USER: `${BASEURL}/api/users`,

  // other
  SKATERS: `${BASEURL}/api/skaters`,
  GOALIES: `${BASEURL}/api/goalies`,
  NHLTEAMS: `${BASEURL}/api/nhlteams`,
  POSITIONS: `${BASEURL}/api/positions`,
  LEAGUES: `${BASEURL}/api/leagues`,
  TEAMS: `${BASEURL}/api/teams`,  
};

export default Routes;