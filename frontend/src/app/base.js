import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../css/navbar.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import HomeScreen from "./screens/homeScreen";

export default function Base (props) {
    var selected = "Home";
    return (<>
        <div className="row h-100">
        <span className="col-1"></span>
        <div className="row h-100 col-lg-10">
            <span className="col-4">
                <Sidebar selected={selected}></Sidebar>
            </span>
            <span className="col-8 right">
                <Navbar message="Hello, user!"></Navbar>
                <BrowserRouter>
                    <Routes>
                        <Route path="/lyonhacks3" element={<HomeScreen></HomeScreen>}></Route>
                    </Routes>
                </BrowserRouter>
            </span>
        </div>
        <span className="col-1"></span>
        </div>
        </>
    );
}
