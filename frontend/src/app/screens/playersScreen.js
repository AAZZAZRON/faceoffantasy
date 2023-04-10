import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";
import { Searchbar } from "../components/searchbar";
import { PlayerModal } from "../components/playerModal";
import ReactPaginate from 'react-paginate';

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
    const [sortingOrder, setSortingOrder] = useState(-1); 
    const [searchFor, setSearchFor] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // for pagination
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(-1);

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
        console.log(sortParam);
        if (sortParam === sortingBy) {
            setSortingOrder(sortingOrder * -1);
            setSkaters(skaters.reverse());
        } else {
            var newSkaters = [...skaters];
            newSkaters.sort((a, b) => (a[sortParam] > b[sortParam]) ? -1 : 1);
            setSortingOrder(-1);
            setSkaters(newSkaters);
            setSortingBy(sortParam);
        }
        setCurrentPage(1);
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
        if (sortParam === sortingBy) {
            setSortingOrder(sortingOrder * -1);
            setGoalies(goalies.reverse());
        } else {
            var newGoalies = [...goalies];
            newGoalies.sort((a, b) => (a[sortParam] > b[sortParam]) ? -1 : 1);
            setSortingOrder(-1);
            if (["goalsAgainst", "goalAgainstAverage", "ot"].includes(sortParam)) {
                newGoalies.reverse();
                setSortingOrder(1);
            }
            setGoalies(newGoalies);
            setSortingBy(sortParam);
        }
        setCurrentPage(1);
    }

    const changeSelectedPosition = (position) => {
        if (position === selectedPosition) return;
        if (selectedPosition === "Goalie") { // reset sorting when changing between skaters/goalies
            setSortingBy("-1");
            setGoalies(allGoalies);
        }
        if (position === "Goalie") {
            setSortingBy("-1");
            setSkaters(allSkaters);
        }

        if (position === "All") { // change page count for pagination
            setPageCount(Math.ceil((skaters.length) / itemsPerPage));
        } else if (position === "Goalie") {
            setPageCount(Math.ceil((goalies.length) / itemsPerPage));
        } else {
            var tmp = skaters.filter((skater) => {
                const tmpPosition = positions.find(position => position.id === skater.primaryPosition);
                return position === "All" || tmpPosition.type === position;
            });
            setPageCount(Math.ceil((tmp.length) / itemsPerPage));
        }
        setSelectedPosition(position); 
    }

    // search's players by name
    const onSearch = async (text) => {
        setSearchFor(text);
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
                <div class='list-container' id='list-container'>
                    {skaters.filter((skater) => {
                        const position = positions.find(position => position.id === skater.primaryPosition);
                        return selectedPosition === "All" || position.type === selectedPosition;
                    }).filter((skater) => {
                        return skater.firstName.toLowerCase().includes(searchFor.toLowerCase()) || skater.lastName.toLowerCase().includes(searchFor.toLowerCase());
                    }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((skater, index) => {
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
                    {goalies.filter((goalie) => {
                        return goalie.firstName.toLowerCase().includes(searchFor.toLowerCase()) || goalie.lastName.toLowerCase().includes(searchFor.toLowerCase());
                    }).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((goalie, index) => {
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
                <div class='paginate'>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel={">"}
                    onPageChange={(e) => {
                        setCurrentPage(e.selected + 1);
                        document.getElementById('list-container').scrollTo(0, 0);
                    }}
                    pageCount={pageCount !== -1 ? pageCount : Math.ceil(skaters.length / itemsPerPage)}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={"<"}
                />
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
