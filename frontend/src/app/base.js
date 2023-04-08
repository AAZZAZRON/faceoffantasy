import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import HomeScreen from "./screens/homeScreen";
import PlayersScreen from "./screens/playersScreen";

export default function Base (props) {

    const [message, setMessage] = React.useState("Hello, user!");
    function messageCallback(title) {
        console.log("Callback called with title: " + title);
        setMessage(title);
    }

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
                            <Route path={basePath} element={<HomeScreen handleCallback={messageCallback}></HomeScreen>}></Route>
                            <Route path={basePath + '/players'} element={<PlayersScreen handleCallback={messageCallback}></PlayersScreen>}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </span>
        </div>
        </div>
        </>
    );
}
