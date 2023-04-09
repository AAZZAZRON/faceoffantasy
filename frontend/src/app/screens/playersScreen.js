import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";
import { Searchbar } from "../components/searchbar";
import { PlayerModal } from "../components/playerModal";

export default function PlayersScreen (props) {
    props.setMessage("All Players");

    const [skaters, setSkaters] = useState([]);
    const [goalies, setGoalies] = useState([]);
    const [allSkaters, setAllSkaters] = useState([]); // for searching
    const [allGoalies, setAllGoalies] = useState([]); // for searching
    const [positions, setPositions] = useState([]);
    const [NHLTeams, setNHLTeams] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("All");
    const [sortingBy, setSortingBy] = useState("-1");
    const [isLoading, setIsLoading] = useState(true);

    // for modal
    const [showModal, setShowModal] = useState(false);
    const [modalPlayer, setModalPlayer] = useState([]);
    const [modalTeam, setModalTeam] = useState([]);
    const [modalPosition, setModalPosition] = useState([]);

    const setModal = (player, position, team) => {
        setModalPlayer(player);
        setModalPosition(position);
        setModalTeam(team);
        setShowModal(true);
        console.log("set modal");
    }

    const skaterSortParams = [
        {name: "GP", value: "games"},
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

    const changeSelectedPosition = (position) => {
        setSelectedPosition(position); 
    }

    // search's players by name
    const onSearch = async (text) => {
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
        setIsLoading(false);
    }

    useEffect(() => {
        onStartup();
    }, []);

    return (
        <>
            <div class="player-container" style={{display: (isLoading ? 'flex' : 'none')}}>
                Loading...
            </div>
            <div class="player-container" style={{display: (!isLoading ? 'flex' : 'none')}}>
                <div class='position-toggle'>
                    <div class={selectedPosition === "All" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => changeSelectedPosition("All")}>All Skaters</div>
                    <div>|</div>
                    <div class={selectedPosition === "Forward" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => changeSelectedPosition("Forward")}>F</div>
                    <div>|</div>
                    <div class={selectedPosition === "Defenseman" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => changeSelectedPosition("Defenseman")}>D</div>
                    <div>|</div>
                    <div class={selectedPosition === "Goalie" ? 'position-toggle-pressed' : 'position-toggle-button'} onClick={() => changeSelectedPosition("Goalie")}>G</div>
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
                <div class='list-container'>
                    {skaters.map((skater, index) => {
                        const position = positions.find(position => position.id === skater.primaryPosition);
                        const team = NHLTeams.find(team => team.id === skater.currentTeam);
                        if (selectedPosition !== "All" && position.type !== selectedPosition) {
                            return null;
                        }
                        return (
                            <SkaterCard key={index} skater={skater} position={position} team={team} setModal={setModal}></SkaterCard>
                        )
                        })
                    }
                    {goalies.map((goalie, index) => {
                        const position = positions.find(position => position.id === goalie.primaryPosition);
                        const team = NHLTeams.find(team => team.id === goalie.currentTeam);
                        if (selectedPosition !== "Goalie" && position.type !== selectedPosition) {
                            return null;
                        }
                        return (
                            <GoalieCard key={index} goalie={goalie} position={position} team={team} setModal={setModal}></GoalieCard>
                        )
                        })
                    }
                </div>
            </div>
            <PlayerModal showModal={showModal} player={modalPlayer} position={modalPosition} team={modalTeam} setShowModal={setShowModal}></PlayerModal>
        </>
    );
}

const rosterStatus = (player) => {
    if (player.rosterStatus === 'Y') return '';
    if (player.rosterStatus === 'I') return 'IR';
    console.log(player.firstName, player.lastName, player.rosterStatus);
    return 'Unknown';
}

export function HeadShot({player, setModal, position, team, avatar}) {
    return (
    <div className="card-header" onClick={() => {
        setModal(player, position, team);
    }}>
        <img src={player.avatar} alt="headshot" className="headshot"/>
        <div>
            <div className="name">{player.firstName} {player.lastName}</div>
            <div className="card-header-bottom">
                <div className="team">{team.abbreviation}</div>
                <div className="position">{position.abbreviation}</div>
                <div className="roster-status">{rosterStatus(player)}</div>
            </div>
        </div>
    </div>
    );
}

function SkaterCard(props) {
    const skater = props.skater;
    return (
        <div className="card" style={{flexDirection: 'row'}}>
            <HeadShot setModal={props.setModal} player={skater} position={props.position} team={props.team}></HeadShot>
            <div className="card-body">
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
            <HeadShot setModal={props.setModal} position={props.position} team={props.team} player={goalie}></HeadShot>
            <div class="card-body">
                <div>{goalie.gamesStarted}</div>
                <div>{goalie.wins}</div>
                <div>{goalie.goalsAgainst}</div>
                <div>{(Math.round(goalie.goalAgainstAverage * 100) / 100).toFixed(2)}</div>
                <div>{goalie.saves}</div>
                <div>{goalie.shutouts}</div>
                <div>{goalie.ot}</div>
                <div>{(Math.round(goalie.savePercentage * 1000) / 1000).toFixed(3)}</div>
            </div>
        </div>
    )
}
