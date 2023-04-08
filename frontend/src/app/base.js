import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import HomeScreen from "./screens/homeScreen";
import LeagueScreen from "./screens/leagueScreen";
import PlayersScreen from "./screens/playersScreen";

export default function Base (props) {

    const [message, setMessage] = React.useState("Hello, <user>!");

    const selections = {
        "/lyonhacks3/league": "League", 
        "/lyonhacks3": "Home", 
        "/lyonhacks3/players": "Players", 
        "/lyonhacks3/settings": "Settings", 
        "/lyonhacks3/switch": "Switch"
    };

    var selected = selections[window.location.pathname];
    const basePath = "/lyonhacks3";
    return (<>
        <div className="row h-100">
        <div className="row h-100 col-12">
            <span className="col-lg-2 col-md-3 col-sm-4 p-0">
                <Sidebar selected={selected}></Sidebar>
            </span>
            <span className="col right">
                <Navbar message={message}></Navbar>
                <div className="homeContainer h-100 row">
                    <BrowserRouter>
                        <Routes>
                            <Route path={basePath} element={<HomeScreen setMessage={setMessage}></HomeScreen>}></Route>
                            <Route path={basePath + '/league'} element={<LeagueScreen setMessage={setMessage}></LeagueScreen>}></Route>
                            <Route path={basePath + '/players'} element={<PlayersScreen setMessage={setMessage}></PlayersScreen>}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </span>
        </div>
        </div>
        </>
    );
}
