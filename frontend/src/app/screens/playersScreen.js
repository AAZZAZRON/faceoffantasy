import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { getDataCache } from "../utils/api/caching";
import { Searchbar } from "../components/searchbar";
import { PlayerModal } from "../components/playerModal";
import ReactPaginate from 'react-paginate';

export default function PlayersScreen (props) {
    props.setMessage("All Players");

    const [skaters, setSkaters] = useState([]); // stores skaters filtered and sorted by params
    const [goalies, setGoalies] = useState([]); // stores goalies filtered and sorted by params
    const [allSkaters, setAllSkaters] = useState([]); // stores all skaters
    const [allGoalies, setAllGoalies] = useState([]); // stores all goalies
    
    const [positions, setPositions] = useState([]);
    const [NHLTeams, setNHLTeams] = useState([]);

    // for filtering and sorting
    const [selectedPosition, setSelectedPosition] = useState("All");
    const [sortingBy, setSortingBy] = useState("-1");
    const [sortingOrder, setSortingOrder] = useState(-1);
    const [searchFilter, setSearchFilter] = useState("");
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

    /* ----- STAT PARAMS ----- */
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

    /* ----- CHANGE USESTATES ----- */
    const changeSelectedPosition = (newPosition) => {
        if (newPosition === selectedPosition) return;
        if (newPosition === "Goalie") setSortingBy("-1"); // skater to goalie
        else if (selectedPosition === "Goalie") setSortingBy("-1"); // only reset sort of goalie to skater
        setSelectedPosition(newPosition);
    }

    const changeSearchFilter = (text) => {
        setSearchFilter(text);
    }

    const changeSortingBy = (newSortParam) => {
        if (newSortParam === sortingBy) {
            setSortingOrder(sortingOrder * -1);
        } else {
            setSortingOrder(-1);
            setSortingBy(newSortParam);
            if (["goalsAgainst", "goalAgainstAverage", "ot"].includes(newSortParam)) {
                setSortingOrder(1);
            }
        }
    }

    /* ----- FILTER AND SORT DATA ----- */
    const filterByPosition = () => { // returns players filtered by position
        if (selectedPosition === "All") {
            return allSkaters;
        } else if (selectedPosition === "Forward") {
            return allSkaters.filter((skater) => {
                const tmpPosition = positions.find(position => position.id === skater.primaryPosition);
                return tmpPosition.type === "Forward";
            });
        } else if (selectedPosition === "Defenseman") {
            return allSkaters.filter((skater) => {
                const tmpPosition = positions.find(position => position.id === skater.primaryPosition);
                return tmpPosition.type === "Defenseman";
            });
        } else if (selectedPosition === "Goalie") {
            return allGoalies;
        } else {
            return [];
        }
    }

    const filterBySearch = (players) => {
        return players.filter((player) => {
            return player.firstName.toLowerCase().includes(searchFilter.toLowerCase()) || player.lastName.toLowerCase().includes(searchFilter.toLowerCase());
        });
    }

    const sortPlayersBy = (players) => { 
        return players.sort((a, b) => (a[sortingBy] > b[sortingBy]) ? sortingOrder : sortingOrder * -1);
    }

    const setPaginationCount = async () => {
        if (selectedPosition === "Goalie") await setPageCount(Math.ceil((goalies.length) / itemsPerPage));
        else await setPageCount(Math.ceil((skaters.length) / itemsPerPage));
    }

    const changePlayerDisplay = async () => { // whenever something happens
        // filter and sort from all players
        var players = await filterByPosition();
        players = await filterBySearch(players);
        players = await sortPlayersBy(players);

        // set players
        if (selectedPosition === "Goalie") {
            setGoalies(players);
        } else {
            setSkaters(players);
        }
    }

    useEffect(() => { // whenever a filter or sort changes, change player list
        changePlayerDisplay();
    }, [selectedPosition, searchFilter, sortingBy, sortingOrder, isLoading]);

    useEffect(() => { // when skaters/goalies changes, set pagination count
        setPaginationCount();
        setCurrentPage(1);
    }, [skaters, goalies]);

    const onStartup = async() => {
        await setSkaters(await getDataCache("SKATERS"));
        await setGoalies(await getDataCache("GOALIES"));
        await setPositions(await getDataCache("POSITIONS"));
        await setNHLTeams(await getDataCache("NHLTEAMS"));
        await setAllSkaters(await getDataCache("SKATERS"));
        await setAllGoalies(await getDataCache("GOALIES"));
        await setIsLoading(false);
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
                    <span className="col-5 d-flex align-items-center">
                        <Searchbar onSearch={changeSearchFilter} placeholder="Search Players"></Searchbar>
                    </span>
                </div>
                <div class="card" style={{flexDirection: 'row'}}>
                    <div class='card-header'>Player</div>
                    <div class='card-body' style={{display: (selectedPosition === "Goalie" ? 'none' : 'flex')}}>
                        {skaterSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => changeSortingBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                    <div class='card-body' style={{display: (selectedPosition !== "Goalie" ? 'none' : 'flex')}}>
                        {goalieSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => changeSortingBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                </div>
                <div class='list-container' id='list-container'>
                    {skaters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((skater, index) => {
                        const position = positions.find(position => position.id === skater.primaryPosition);
                        const team = NHLTeams.find(team => team.id === skater.currentTeam);
                        if (selectedPosition === "Goalie") {
                            return null;
                        }
                        return (
                            <SkaterCard key={index} skater={skater} position={position} team={team} setModal={setModal}></SkaterCard>
                        )
                    })}
                    {goalies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((goalie, index) => {
                        const position = positions.find(position => position.id === goalie.primaryPosition);
                        const team = NHLTeams.find(team => team.id === goalie.currentTeam);
                        if (selectedPosition !== "Goalie") {
                            return null;
                        }
                        return (
                            <GoalieCard key={index} goalie={goalie} position={position} team={team} setModal={setModal}></GoalieCard>
                        )
                    })}
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
                    forcePage={currentPage - 1}
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
