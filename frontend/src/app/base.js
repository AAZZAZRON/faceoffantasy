import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import HomeScreen from "./screens/homeScreen";
import PlayersScreen from "./screens/playersScreen";

export default function Base (props) {
    var selected = "Home";
    const basePath = "/lyonhacks3";
    return (<>
        <div className="row h-100">
        <span className="col-1"></span>
        <div className="row h-100 col-lg-10">
            <span className="col-4">
                <Sidebar selected={selected}></Sidebar>
            </span>
            <span className="col-8 right">
                <Navbar message="Hello, user!"></Navbar>
                <div className="homeContainer h-100 row">
                    <BrowserRouter>
                        <Routes>
                            <Route path={basePath} element={<HomeScreen></HomeScreen>}></Route>
                            <Route path={basePath + '/players'} element={<PlayersScreen></PlayersScreen>}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </span>
        </div>
        <span className="col-1"></span>
        </div>
        </>
    );
}
