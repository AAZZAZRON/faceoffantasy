// @ts-ignore
// const BASEURL = import.meta.env.DEV ? "https://auth.jimmyliu.dev" : "https://maclyonsden.com";
const BASEURL = "https://lyonhacks3-production.up.railway.app";

const Routes = {
  BASEURL: BASEURL,
  AUTH: {
    LOGIN: `${BASEURL}/api/token`,
    REFRESH: `${BASEURL}/api/token/refresh`,
  },
  POST: {
    USER: `${BASEURL}/api/users`,
  },
  USER: `${BASEURL}/api/v3/obj/users`,
};

export default Routes;