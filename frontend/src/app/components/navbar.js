import { useState } from "react";
import "../../css/navbar.css";
// the top navbar {message=the message to display at the top}
export default function Navbar(props){
    const message = props.message


    return(
        <div className="nav-height nav-container row d-flex">
            <span className="col-7 text-center d-flex justify-content-center">
                <span className="d-flex align-items-end"><span className="nav-message"><h1>{message}</h1></span></span>
            </span>
        </div>
    )   
}
