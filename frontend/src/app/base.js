import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { useEffect, useState } from 'react';
import HomeScreen from "./screens/homeScreen";
import LeagueScreen from "./screens/leagueScreen";
import PlayersScreen from "./screens/playersScreen";
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import LeagueSwitchScreen from './screens/leagueSwitchScreen';
import { setDataCache, getDataCache } from './utils/api/caching';
import routes from './utils/misc/routes';
import { callAndStore } from './utils/api/callApi';
import { loggedIn } from './utils/AuthService';

export default function Base (props) {
    const checkLoggedIn = false;

    // sent to login if not logged in
    useEffect(() => {
        if(checkLoggedIn && !loggedIn() && window.location.pathname !== "/lyonhacks3/signup" && window.location.pathname !== "/lyonhacks3/login") {
            window.location.href = "/lyonhacks3/login";
        }
    }, []);

    async function fetchData(cacheName, url) {
        if (!getDataCache(cacheName)) {
            await callAndStore(cacheName, url);
            console.log("cache set for " + cacheName);
        }
        else console.log("Cache found for " + cacheName);
    }

    // cache everything
    useEffect(() => {
        fetchData("SKATERS", `${routes.SKATERS}/`);
        fetchData("GOALIES", `${routes.GOALIES}/`);
        fetchData("POSITIONS", `${routes.POSITIONS}/`);
        fetchData("NHLTEAMS", `${routes.NHLTEAMS}/`);
        fetchData("LEAGUES", `${routes.LEAGUES}/`);
        fetchData("TEAMS", `${routes.TEAMS}/`);
    }, []);

    const [message, setMessage] = React.useState("Hello, <user>!");

    const selections = {
        "/lyonhacks3/league": "League", 
        "/lyonhacks3": "Home", 
        "/lyonhacks3/players": "Players", 
        "/lyonhacks3/settings": "Settings", 
        "/lyonhacks3/switch": "Switch"
    };

    const noSideNavBar = ["/lyonhacks3/signup", "/lyonhacks3/login"];

    var selected = selections[window.location.pathname];
    const basePath = "/lyonhacks3";
    return (<>
        <BrowserRouter>
            {/* routes that don't have the sidebar and navbar */}
            <Routes>
                <Route path={basePath + '/login'} element={<LoginScreen handleCallback={setMessage}></LoginScreen>}></Route>
                <Route path={basePath + '/signup'} element={<SignupScreen handleCallback={setMessage}></SignupScreen>}></Route>
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
                            <Route path={basePath + '/switch'} element={<LeagueSwitchScreen setMessage={setMessage}></LeagueSwitchScreen>}></Route>
                        </Routes>
                    </div>
                </span>
            </div>
            </div>
        </BrowserRouter>
    </>);
}
