import "../../css/playersScreen.css";
import { getGoalies, getSkaters } from "../../js/apiCalls";
import { useState, useEffect } from "react";

export default function PlayersScreen (props) {
    props.setMessage("<team name>'s Roster");

    const [skaters, setSkaters] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const onStartup = async() => {
        await fetch('https://lyonhacks3-production.up.railway.app/api/skaters/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            setSkaters(data);
            setLoaded(true);
        })
        .catch((error) => console.log(error.message));
    }

    useEffect(() => {
        onStartup();
    }, []);

    return (
        <>
            {loaded ? <div class="playerHeader">Skaters</div> : <div class="playerHeader">Loading...</div>}
            <ul class="player-list">
                {skaters.map((skater, index) => (
                    <li key={index} class="player">
                        <div class="playerName">{skater.firstName + ' ' + skater.lastName}</div>
                    </li>
                ))}
            </ul>
        </>
    );
}
