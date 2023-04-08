import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";

export default function PlayersScreen (props) {
    props.setMessage("<team name>'s Roster");

    const [skaters, setSkaters] = useState([]);
    const [goalies, setGoalies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const onStartup = async() => {
        setSkaters(await getDataCache("SKATERS"));
        setGoalies(await getDataCache("GOALIES"));
        setLoaded(true);
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
