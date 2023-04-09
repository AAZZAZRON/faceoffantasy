import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";
import { loggedIn } from "../utils/AuthService";
import { Searchbar } from "../components/searchbar";

export default function PlayersScreen (props) {

    if(!loggedIn()) {
        window.location.href = "/lyonhacks3/login";
    }

    props.setMessage("<team name>'s Roster");

    const [skaters, setSkaters] = useState([]);
    const [goalies, setGoalies] = useState([]);
    const [allSkaters, setAllSkaters] = useState([]); // for searching
    const [allGoalies, setAllGoalies] = useState([]); // for searching
    const [positions, setPositions] = useState([]);
    const [NHLTeams, setNHLTeams] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("All");
    const [sortingBy, setSortingBy] = useState("-1");

    const skaterSortParams = [
        {name: " GP", value: "games"},
        {name: "   G", value: "goals"},
        {name: "   A", value: "assists"},
        {name: "PIM", value: "penaltyMinutes"},
        {name: "PPP", value: "powerPlayPoints"},
        {name: "SHG", value: "shortHandedGoals"},
        {name: "SOG", value: "shots"},
        {name: "HIT", value: "hits"},
        {name: "BLK", value: "blocked"},
        {name: "+/-", value: "plusMinus"},
    ]

    const sortSkatersBy = (sortParam) => {
        var newSkaters = [...skaters];
        newSkaters.sort((a, b) => (a[sortParam] > b[sortParam]) ? -1 : 1);
        setSkaters(newSkaters);
        setSortingBy(sortParam);
    }

    const goalieSortParams = [
        {name: "GS", value: "gamesStarted"},
        {name: " W", value: "wins"},
        {name: "GA", value: "goalsAgainst"},
        {name: "GAA", value: "goalAgainstAverage"},
        {name: "SV", value: "saves"},
        {name: "SO", value: "shutouts"},
        {name: "OTL", value: "ot"},
        {name: "SV%", value: "savePercentage"},
    ]

    const sortGoaliesBy = (sortParam) => {
        var newGoalies = [...goalies];
        newGoalies.sort((a, b) => (a[sortParam] > b[sortParam]) ? -1 : 1);
        setGoalies(newGoalies);
        setSortingBy(sortParam);
    }

    // search's players by name
    const onSearch = async (text) => {
        if (text === "" || text === null) {
            return;
        }

        var newSkaters = [...allSkaters];
        newSkaters = newSkaters.filter((skater) => {
            return skater.firstName.toLowerCase().includes(text.toLowerCase()) || skater.lastName.toLowerCase().includes(text.toLowerCase());
        });
        setSkaters(newSkaters);

        var newGoalies = [...allGoalies];
        newGoalies = newGoalies.filter((goalie) => {
            return goalie.firstName.toLowerCase().includes(text.toLowerCase()) || goalie.lastName.toLowerCase().includes(text.toLowerCase());
        });
        setGoalies(newGoalies);
    }

    const onStartup = async() => {
        setSkaters(await getDataCache("SKATERS"));
        setGoalies(await getDataCache("GOALIES"));
        setPositions(await getDataCache("POSITIONS"));
        setNHLTeams(await getDataCache("NHLTEAMS"));
        setAllSkaters(await getDataCache("SKATERS"));
        setAllGoalies(await getDataCache("GOALIES"));
    }

    useEffect(() => {
        onStartup();
    }, []);

    return (
        <>
            <div class="player-container">
                <div class='position-toggle'>
                    <div class={selectedPosition === "All" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => {setSelectedPosition("All"); setSortingBy("-1");}}>All Skaters</div>
                    <div>|</div>
                    <div class={selectedPosition === "Forward" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => {setSelectedPosition("Forward"); setSortingBy("-1");}}>F</div>
                    <div>|</div>
                    <div class={selectedPosition === "Defenseman" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => {setSelectedPosition("Defenseman"); setSortingBy("-1");}}>D</div>
                    <div>|</div>
                    <div class={selectedPosition === "Goalie" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => {setSelectedPosition("Goalie"); setSortingBy("-1");}}>G</div>
                    <span className="col-5 d-flex align-items-center"><Searchbar onSearch={onSearch} placeholder="Search Players"></Searchbar></span>
                </div>
                <div class="card" style={{flexDirection: 'row'}}>
                    <div class='card-header'>Player</div>
                    <div class='card-body' style={{display: (selectedPosition === "Goalie" ? 'none' : 'flex')}}>
                        {skaterSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => sortSkatersBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                    <div class='card-body' style={{display: (selectedPosition !== "Goalie" ? 'none' : 'flex')}}>
                        {goalieSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => sortGoaliesBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                </div>

                {skaters.map((skater, index) => {
                    const position = positions.find(position => position.id === skater.primaryPosition);
                    const team = NHLTeams.find(team => team.id === skater.currentTeam);
                    if (selectedPosition !== "All" && position.type !== selectedPosition) {
                        return null;
                    }
                    return (
                        <SkaterCard key={index} skater={skater} position={position} team={team}></SkaterCard>
                    )
                    })
                }
                {goalies.map((goalie, index) => {
                    const position = positions.find(position => position.id === goalie.primaryPosition);
                    const team = NHLTeams.find(team => team.id === goalie.currentTeam);
                    if (selectedPosition !== "All" && position.type !== selectedPosition) {
                        return null;
                    }
                    return (
                        <GoalieCard key={index} goalie={goalie} position={position} team={team}></GoalieCard>
                    )
                    })
                }
            </div>
        </>
    );
}

function SkaterCard(props) {
    const skater = props.skater;
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

function GoalieCard(props) {
    const goalie = props.goalie;
    return (
        <div class="card" style={{flexDirection: 'row'}}>
            <div class="card-header">
                <img src={goalie.avatar} alt="headshot" class="headshot"/>
                <div>
                    <div class="name">{goalie.firstName} {goalie.lastName}</div>
                    <div class="card-header-bottom">
                        <div class="team">{props.team.abbreviation}</div>
                        <div class="position">{props.position.abbreviation}</div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div>{goalie.gamesStarted}</div>
                <div>{goalie.wins}</div>
                <div>{goalie.goalsAgainst}</div>
                <div>{Math.round(goalie.goalAgainstAverage * 100) / 100}</div>
                <div>{goalie.saves}</div>
                <div>{goalie.shutouts}</div>
                <div>{goalie.ot}</div>
                <div>{Math.round(goalie.savePercentage * 1000) / 1000 }</div>
            </div>
        </div>
    )
}
