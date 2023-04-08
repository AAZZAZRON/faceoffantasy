// @ts-ignore
// const BASEURL = import.meta.env.DEV ? "https://auth.jimmyliu.dev" : "https://maclyonsden.com";
const BASEURL = "https://lyonhacks3-production.up.railway.app";

const Routes = {
  // auth
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/token`,
    REFRESH: `${BASEURL}/api/token/refresh`,
  },
  POST: {
    USER: `${BASEURL}/api/users`,
  },
  USER: `${BASEURL}/api/v3/obj/users`,

  // other
  SKATERS: `${BASEURL}/api/skaters/`,
  GOALIES: `${BASEURL}/api/goalies/`,
  NHLTEAMS: `${BASEURL}/api/nhlteams/`,
  POSITIONS: `${BASEURL}/api/positions/`,
  LEAGUES: `${BASEURL}/api/leagues/`,
  TEAMS: `${BASEURL}/api/teams/`,  
};

export default Routes;