import "../../css/playersScreen.css";
import { getGoalies, getSkaters } from "../../js/apiCalls";
import { useState, useEffect } from "react";

export default function PlayersScreen (props) {
    const message = "Players on <Team Name>";
    props.handleCallback(message);

    const [skaters, setSkaters] = useState([]);

    const onStartup = async() => {
        await fetch('https://lyonhacks3-production.up.railway.app/api/skaters/')
        .then((response) => response.json())
        .then((data) => {
            console.log("HI");
            setSkaters(data);
        })
        .catch((error) => console.log(error.message));
    }

    useEffect(() => {
        onStartup();
    }, []);

    console.log("HI");

    return (
        <>
        <div>playerScreen</div>
        </>
    );
}
