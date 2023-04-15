import "../../css/playersScreen.css";
import { useState, useEffect } from "react";
import { Searchbar } from "../components/searchbar";
import { PlayerModal } from "../components/playerModal";
import ReactPaginate from 'react-paginate';
import { SkaterCard, GoalieCard } from "../components/playerCards";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PlayerPoints } from "../utils/calculator";

export default function PlayersScreen (props) {

    props.setMessage("All Players");

    const [players, setPlayers] = useState([]); // stores all players [skaters, goalies]

    // user stuff
    const user = useSelector(state => state.users.currentuser);
    const [allUsers, setAllUsers] = useState([]); // all users
    const currentTeam = useSelector(state => state.teams.currentTeam);
    const currentLeague = useSelector(state => state.leagues.currentLeague);

    const allSkaters = useSelector(state => state.nhl.skaters);
    const allGoalies = useSelector(state => state.nhl.goalies);

    allSkaters.forEach((skater) => {
        skater.fantasyPoints = PlayerPoints(skater, currentLeague);
        skater.avgFantasyPoints = (skater.games !== 0 ? skater.fantasyPoints / skater.games : 0).toFixed(1);
    });
    allGoalies.forEach((goalie) => {
        goalie.fantasyPoints = PlayerPoints(goalie, currentLeague);
        allGoalies.forEach((goalie) => goalie.avgFantasyPoints = (goalie.games !== 0 ? goalie.fantasyPoints / goalie.games : 0).toFixed(1));
    });

    const positions = useSelector(state => state.nhl.positions);
    const NHLTeams = useSelector(state => state.nhl.nhlteams);
    const teams = useSelector(state => state.teams.allTeams);
    const leagues = useSelector(state => state.leagues.allLeagues);

    // for filtering and sorting
    const [selectedPosition, setSelectedPosition] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
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
    const [modalOwner, setModalOwner] = useState([]);

    const setModal = (player, position, team, owner) => {
        setModalPlayer(player);
        setModalPosition(position);
        setModalTeam(team);
        setModalOwner(owner);
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
        {name: "TOT", value: "fantasyPoints"},
        {name: "AVG", value: "avgFantasyPoints"}
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
        {name: "TOT", value: "fantasyPoints"},
        {name: "AVG", value: "avgFantasyPoints"}
    ]

    /* ----- CHANGE USESTATES ----- */
    const changeSelectedPosition = (newPosition) => {
        if (newPosition === selectedPosition) return;
        if (newPosition === "Goalie") setSortingBy("-1"); // skater to goalie
        else if (selectedPosition === "Goalie") setSortingBy("-1"); // only reset sort of goalie to skater
        setSelectedPosition(newPosition);
    }

    const changeSelectedStatus = (newStatus) => {
        if (newStatus === selectedStatus) return;
        setSelectedStatus(newStatus);
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

    const filterByStatus = (players) => { 
        if (selectedStatus === "All") {
            return players;
        } else if (selectedStatus === "Healthy") {
            return players.filter((player) => {
                return player.rosterStatus === "Y";
            });
        } else if (selectedStatus === "Injured") {
            return players.filter((player) => {
                return player.rosterStatus === "I";
            });
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
        return players.sort((a, b) => (parseFloat(a[sortingBy], 10) > parseFloat(b[sortingBy], 10)) ? sortingOrder : sortingOrder * -1);
    }

    const setPaginationCount = async () => {
        await setPageCount(Math.ceil((players.length) / itemsPerPage));
    }

    /* ----- USEEFFECTS ----- */
    const changePlayerDisplay = async () => { // whenever something happens
        // filter and sort from all players
        var players = await filterByPosition();
        players = await filterByStatus(players);
        players = await filterBySearch(players);
        players = await sortPlayersBy(players);

        setPlayers(players);
    }

    useEffect(() => { // whenever a filter or sort changes, change player list
        changePlayerDisplay();
    }, [selectedPosition, selectedStatus, searchFilter, sortingBy, sortingOrder, isLoading]);

    useEffect(() => { // when skaters/goalies changes, set pagination count
        setPaginationCount();
        setCurrentPage(1);
    }, [players]);

    /* ----- HELPER METHODS ----- */
    const getTeamOfPlayer = (player) => {
        if (player == null) return null;

        for (let teamId of currentLeague.teams) {
            const team = teams.find(team => team.id === teamId);
            if (team.forwards.includes(player.id)) return team;
            if (team.defensemen.includes(player.id)) return team;
            if (team.goalies.includes(player.id)) return team;
        }
        return {teamName: "None (Free Agent)", abbreviation: "FA"};
    }

    /* ----- STARTUP LOADING ----- */
    const onStartup = async() => {
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
                <div class="top-bar">
                    <div class='toggle'>
                        <div>Position: </div>
                        <div class={selectedPosition === "All" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedPosition("All")}>All Skaters</div>
                        <div>|</div>
                        <div class={selectedPosition === "Forward" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedPosition("Forward")}>F</div>
                        <div>|</div>
                        <div class={selectedPosition === "Defenseman" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedPosition("Defenseman")}>D</div>
                        <div>|</div>
                        <div class={selectedPosition === "Goalie" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedPosition("Goalie")}>G</div>
                    </div>
                    <div class="toggle">
                        <div>Status: </div>
                        <div class={selectedStatus === "All" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedStatus("All")}>All</div>
                        <div>|</div>
                        <div class={selectedStatus === "Healthy" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedStatus("Healthy")}>Healthy</div>
                        <div>|</div>
                        <div class={selectedStatus === "Injured" ? 'toggle-pressed' : 'toggle-button'} onClick={() => changeSelectedStatus("Injured")}>Injured</div>
                    </div>
                    <span className="col-5 d-flex align-items-center">
                        <Searchbar onSearch={changeSearchFilter} placeholder="Search Players"></Searchbar>
                    </span>
                </div>
                <div class="card" style={{flexDirection: 'row'}}>
                    <div class='card-header'>Player</div>
                    <div class='card-body' style={{display: (selectedPosition === "Goalie" ? 'none' : 'flex')}}>
                        <div style={{minWidth: '45px'}}>Owner</div>
                        {skaterSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => changeSortingBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                    <div class='card-body' style={{display: (selectedPosition !== "Goalie" ? 'none' : 'flex')}}>
                        <div>Owner</div>
                        {goalieSortParams.map((param, index) => {
                            return (
                                <div key={index} onClick={() => changeSortingBy(param.value)} class={(param.value === sortingBy ? 'header-sort' : 'header')}>{param.name}</div>
                            )
                        })}
                    </div>
                </div>
                <div class='list-container' id='list-container'>
                    {players.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((player, index) => {
                        const position = positions.find(position => position.id === player.primaryPosition);
                        const team = NHLTeams.find(team => team.id === player.currentTeam);
                        const owner = getTeamOfPlayer(player);

                        if (selectedPosition === "Goalie") {
                            return (
                                <GoalieCard key={index} goalie={player} position={position} team={team} owner={owner} setModal={setModal}></GoalieCard>
                            )
                        } else {
                            return (
                                <SkaterCard key={index} skater={player} position={position} team={team} owner={owner} setModal={setModal}></SkaterCard>
                            )
                        }
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
                    pageCount={pageCount}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={"<"}
                />
                </div>
            </div>
            <PlayerModal showModal={showModal} player={modalPlayer} position={modalPosition} team={modalTeam} owner={modalOwner} setShowModal={setShowModal}></PlayerModal>
        </>
    );
}
