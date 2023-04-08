import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";

export default function PlayersScreen (props) {
    props.setMessage("<team name>'s Roster");

    const [skaters, setSkaters] = useState([]);
    const [goalies, setGoalies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [NHLTeams, setNHLTeams] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const onStartup = async() => {
        setSkaters(await getDataCache("SKATERS"));
        setGoalies(await getDataCache("GOALIES"));
        setPositions(await getDataCache("POSITIONS"));
        setNHLTeams(await getDataCache("NHLTEAMS"));
        setLoaded(true);
    }

    useEffect(() => {
        onStartup();
    }, []);

    return (
        <>
            <div class="player-container">
                {loaded ? 
                <div class="card" style={{flexDirection: 'row'}}>
                    <div class='card-header'>Player</div>
                    <div class='card-body'>
                        <div>GP</div>
                        <div>G</div>
                        <div>A</div>
                        <div>PIM</div>
                        <div>PPP</div>
                        <div>SHG</div>
                        <div>SOG</div>
                        <div>HIT</div>
                        <div>BLK</div>
                        <div>+/-</div>
                    </div>
                </div>
                 : 
                 <div class="playerHeader">Loading...</div>}
                {skaters.map((skater, index) => {
                    const position = positions.find(position => position.id === skater.primaryPosition);
                    const team = NHLTeams.find(team => team.id === skater.currentTeam);
                    return (
                        <SkaterCard key={index} skater={skater} position={position} team={team}></SkaterCard>
                    )
                    })
                }
            </div>
        </>
    );
}

function SkaterCard(props) {
    const skater = props.skater;
    console.log(props.team);
    return (
        <div class="card" style={{flexDirection: 'row'}}>
            <div class="card-header">
                <img src={skater.avatar} alt="headshot" class="headshot"/>
                <div>
                    <div class="name">{skater.firstName} {skater.lastName}</div>
                    <div class="card-header-bottom">
                        <div class="team">{props.team.abbreviation}</div>
                        <div class="position">{props.position.abbreviation}</div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div>{skater.games}</div>
                <div>{skater.goals}</div>
                <div>{skater.assists}</div>
                <div>{skater.pim}</div>
                <div>{skater.powerPlayPoints}</div>
                <div>{skater.shortHandedPoints}</div>
                <div>{skater.shots}</div>
                <div>{skater.hits}</div>
                <div>{skater.blocked}</div>
                <div>{skater.plusMinus}</div>
            </div>
        </div>
    )
}
