import "../../css/playersScreen.css";
import { getGoalies, getSkaters } from "../../js/apiCalls";
import { useState, useEffect } from "react";

export default function PlayersScreen (props) {
    props.setMessage("<team name>'s Roster");

    const [skaters, setSkaters] = useState([]);

    const onStartup = async() => {
        await fetch('http://127.0.0.1:8000/api/skaters/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
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
