import React from "react";
import "../../css/homeScreen.css";
import {SessionContext} from "../utils/sessions";

export default function HomeScreen (props) {

    const message = "Hello, <User>!";
    props.handleCallback(message);
    const session = React.useContext(SessionContext);
    console.log(session);

    return (
        <>
            <div className="col-7 h-100">
                <div className="cur-team h-100">
                    <span className="align-middle text-center">My Team</span>
                </div>
            </div>
            <div className="col-5 h-100 d-flex flex-column justify-content-between">
                <div className="watchlist">
                    Watchlist
                </div>
                <div className="league align-bottom">
                    My League
                </div>
            </div>
        </>
    );
}
