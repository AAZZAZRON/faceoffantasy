import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { useEffect } from 'react';
import HomeScreen from "./screens/homeScreen";
import LeagueScreen from "./screens/leagueScreen";
import PlayersScreen from "./screens/playersScreen";
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import LeagueSettingsScreen from './screens/leagueSettingsScreen';
import LeagueSwitchScreen from './screens/leagueSwitchScreen';
import routes from './utils/routes';
import { loggedIn, hasActiveTeam } from './utils/AuthService';
import Copyright from './components/copyright';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';



export default function Base (props) {
    const basePath = "/faceoffantasy";

    const checkLoggedIn = true;
    const checkHasLeague = true;

    const currentTeam = useSelector((state) => state.teams.currentTeam);

    // sent to login if not logged in, sent to forceswitch if not in a league, sent to home if logged in and in a league
    useEffect(() => {
        console.log("useEffect")
        if(checkLoggedIn && !loggedIn() && window.location.pathname !== basePath + "/signup" && window.location.pathname !== basePath + "/login") {
            window.location.href = basePath + "/login";
        }
        if (checkLoggedIn && loggedIn() && (window.location.pathname === basePath + "/login" || window.location.pathname === basePath + "/signup")) {
            window.location.href = "/faceoffantasy";
        }
        if (checkHasLeague && loggedIn() && (!currentTeam) && window.location.pathname !== basePath + "/switchforce") {
            window.location.href = basePath + "/switchforce";
        }
    }, []);

    const [message, setMessage] = React.useState("Hello, <user>!");

    const selections = {
        "/faceoffantasy/league": "League", 
        "/faceoffantasy": "Home", 
        "/faceoffantasy/players": "Players", 
        "/faceoffantasy/settings": "Settings", 
        "/faceoffantasy/switch": "Switch"
    };

    const noSideNavBar = [basePath + "/signup", basePath + "/login", basePath + "/switchforce"];

    var selected = selections[window.location.pathname];
    return (<>
        <BrowserRouter>
            {/* routes that don't have the sidebar and navbar */}
            <Routes>
                <Route path={basePath + '/login'} element={<LoginScreen handleCallback={setMessage}></LoginScreen>}></Route>
                <Route path={basePath + '/signup'} element={<SignupScreen handleCallback={setMessage}></SignupScreen>}></Route>
                <Route path={basePath + '/switchforce'} element={<LeagueSwitchScreen setMessage={setMessage} force={true}></LeagueSwitchScreen>}></Route>
            </Routes>

            {/* routes that have the sidebar and navbar */}
            <div className="row h-100" style={{display: ((noSideNavBar.includes(window.location.pathname) || (checkLoggedIn && !loggedIn())) ? 'none' : 'auto')}}>
            <div className="row h-100 col-12">
                <span className="col-lg-2 col-md-3 col-sm-4 p-0">
                    <Sidebar selected={selected}></Sidebar>
                </span>
                <span className="col right">
                    <Navbar message={message}></Navbar>
                    <div className="homeContainer h-100 row">
                        <Routes>
                            <Route path={basePath} element={<HomeScreen setMessage={setMessage}></HomeScreen>}></Route>
                            <Route path={basePath + '/league'} element={<LeagueScreen setMessage={setMessage}></LeagueScreen>}></Route>
                            <Route path={basePath + '/players'} element={<PlayersScreen setMessage={setMessage}></PlayersScreen>}></Route>
                            <Route path={basePath + '/settings'} element={<LeagueSettingsScreen setMessage={setMessage}></LeagueSettingsScreen>}></Route>
                            <Route path={basePath + '/switch'} element={<LeagueSwitchScreen setMessage={setMessage}></LeagueSwitchScreen>}></Route>
                        </Routes>
                    </div>
                </span>
            </div>
                <div style={{borderTop: "solid", borderColor: "lightgray", width: "100%", height: "5%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {'Visit our '}
                        <Link color="inherit" href="https://github.com/AAZZAZRON/faceoffantasy">
                        Github
                        </Link>
                        {' |'}
                    </Typography>
                    &nbsp;
                    <Copyright />
                </div>
            </div>
        </BrowserRouter>
    </>);
}
