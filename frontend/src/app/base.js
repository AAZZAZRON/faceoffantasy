import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import HomeScreen from "./screens/homeScreen";
import LeagueScreen from "./screens/leagueScreen";
import PlayersScreen from "./screens/playersScreen";
import SignupScreen from './screens/signupScreen';

export default function Base (props) {

    const [message, setMessage] = React.useState("Hello, <user>!");

    const selections = {
        "/lyonhacks3/league": "League", 
        "/lyonhacks3": "Home", 
        "/lyonhacks3/players": "Players", 
        "/lyonhacks3/settings": "Settings", 
        "/lyonhacks3/switch": "Switch"
    };

    const noSideNavBar = ["/lyonhacks3/signup"];

    var selected = selections[window.location.pathname];
    const basePath = "/lyonhacks3";
    return (<>
        <BrowserRouter>
            {/* routes that don't have the sidebar and navbar */}
            <Routes>
                <Route path={basePath + '/signup'} element={<SignupScreen setMessage={setMessage}></SignupScreen>}></Route>
            </Routes>

            {/* routes that have the sidebar and navbar */}
            <div className="row h-100" style={{display: (noSideNavBar.includes(window.location.pathname) ? 'none' : 'inline')}}>
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
                        </Routes>
                    </div>
                </span>
            </div>
            </div>
        </BrowserRouter>
    </>);
}
