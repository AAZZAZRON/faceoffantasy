import React, { useEffect } from 'react';
import Modal from 'react-modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "../../css/leagueSwitchScreen.css";
import Routes from '../utils/misc/routes';
import { getDataCache } from '../utils/api/caching';
import { callAndStore } from '../utils/api/callApi';
import routes from '../utils/misc/routes';

export default function LeagueSwitchScreen(props) {
    
    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);
    const [showLeagueJoinModal, setShowLeagueJoinModal] = React.useState(false);

    props.setMessage("My leagues");
    return (<>
        <LeagueCreationModal showLeagueCreationModal={showLeagueCreationModal} setShowLeagueCreationModal={setShowLeagueCreationModal}></LeagueCreationModal>
        <LeagueJoinModal showLeagueJoinModal={showLeagueJoinModal} setShowLeagueJoinModal={setShowLeagueJoinModal}></LeagueJoinModal>
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>Select a League</h2>
                <div className={"enter-league-buttons"}>
                    <button className={"enter-league-button"} style={{fontWeight: "bold"}} onClick={() => setShowLeagueJoinModal(true)}>Join League</button>
                    <button className={"enter-league-button"} style={{fontWeight: "bold", backgroundColor: "#add8e6"}} onClick={() => setShowLeagueCreationModal(true)}>Create League</button>
                </div>
            </div>
            <hr style={{width: "95%"}}/>
            <LeagueCard name={"National Hockey League"} playercount={4} active={true}></LeagueCard>
            <LeagueCard name={"Sam's Fantasy League"} playercount={6}></LeagueCard>
            <LeagueCard name={":D"} playercount={8}></LeagueCard>
        </div>
    </>);
}

function LeagueCard(props) {
    return (
        <div className={"league-card"} style={{backgroundColor: props.active ? "#e5ddfd" : "#f1f1f1"}}>
            <div className={"league-place-info"}>
                <div style={{fontSize: "1.5em", marginLeft: "3%"}}>{props.name}</div>

            </div>
            <div>{props.playercount} players</div>
        </div>
    )
}

function LeagueCreationModal(props) {
    const [modalIsOpen , setModalIsOpen] = React.useState(false);

    useEffect(() => {
        if (props.showLeagueCreationModal) setModalIsOpen(true);
        else setModalIsOpen(false);
    }, [props.showLeagueCreationModal]);

    function closeModal() {
        setModalIsOpen(false);
        props.setShowLeagueCreationModal(false);
    }

    const rosterSettings = {"Forwards Allowed" : 6, "Defensemen Allowed": 4, "Goalies Allowed": 2};
    const pointsSettings = {"Goals" : 3, "Assists" : 2, "Penalty Minutes" : 0.5, "Shots" : 0.1, "Hits" : 0.5, "Power Play Points" : 1, "Short Handed Points" : 2, "Blocks" : 0.5, "Wins" : 3, "Losses" : 0, "Overtime Losses" : 1, "Saves" : 0.2, "Shutouts" : 3, "Goals Against" : -1};

    function RosterSettingsForms() {
        return (
            <div>
                {Object.keys(rosterSettings).map((setting, index) => (
                    <div key={index}>
                        <TextField
                        id={setting}
                        label={setting}
                        name={setting}
                        type="number"
                        required
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        defaultValue={rosterSettings[setting]}
                        sx={{ my: 1, width: '30%' }}
                        />
                        </div>
                ))}
            </div>
        )
    }

    function PointsSettingsForms() {
        return (
            <div>
                {Object.keys(pointsSettings).map((setting, index) => (
                    <div key={index}>
                        <TextField
                        id={setting}
                        label={setting}
                        name={setting}
                        type="number"
                        required
                        inputProps={{ min: -10, max: 10, step: 0.1 }}
                        defaultValue={pointsSettings[setting]}
                        sx={{ my: 1, width: '30%' }}
                        />
                        </div>
                ))}
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // post to api
        const leagueName = data.get('Name');
        const rosterSettings = {"Forwards Allowed" : data.get('Forwards Allowed'), "Defensemen Allowed": data.get('Defensemen Allowed'), "Goalies Allowed": data.get('Goalies Allowed')};
        const pointsSettings = {"Goals" : data.get('Goals'), "Assists" : data.get('Assists'), "Penalty Minutes" : data.get('Penalty Minutes'), "Shots" : data.get('Shots'), "Hits" : data.get('Hits'), "Power Play Points" : data.get('Power Play Points'), "Short Handed Points" : data.get('Short Handed Points'), "Blocks" : data.get('Blocks'), "Wins" : data.get('Wins'), "Losses" : data.get('Losses'), "Overtime Losses" : data.get('Overtime Losses'), "Saves" : data.get('Saves'), "Shutouts" : data.get('Shutouts'), "Goals Against" : data.get('Goals Against')};

        const ownerId = getDataCache("user").id;

        fetch(`${Routes.POST.CREATELEAGUE}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": leagueName,
                'owner': ownerId,
                "numForwards": rosterSettings["Forwards Allowed"],
                "numDefensemen": rosterSettings["Defensemen Allowed"],
                "numGoalies": rosterSettings["Goalies Allowed"],
                "goals": pointsSettings["Goals"],
                "assists": pointsSettings["Assists"],
                "pim": pointsSettings["Penalty Minutes"],
                "shots": pointsSettings["Shots"],
                "hits": pointsSettings["Hits"],
                "powerPlayPoints": pointsSettings["Power Play Points"],
                "shortHandedPoints": pointsSettings["Short Handed Points"],
                "blocked": pointsSettings["Blocks"],
                "wins": pointsSettings["Wins"],
                "losses": pointsSettings["Losses"],
                "ot": pointsSettings["Overtime Losses"],
                "saves": pointsSettings["Saves"],
                "shutouts": pointsSettings["Shutouts"],
                "goalsAgainst": pointsSettings["Goals Against"]
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            callAndStore("LEAGUES", `${routes.LEAGUES}/`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // close modal
        closeModal();
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <div style={{borderBottom: "solid", borderColor: "lightgray", marginBottom: "3%"}}><h2>Create League</h2></div>
                <Box component="form"
                sx={{
                    my: 1,
                    mx: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
                onSubmit={handleSubmit}
                autoComplete="off"
                >
                    <div className='league-form-container'>
                        <h5>League Name</h5>

                        <TextField
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        name="Name"
                        sx = {{ mb: 3, width: '100%' }}
                        InputProps={{
                            inputMode: "numeric",
                            pattern: "^[a-zA-Z0-9]*$",
                            minLength: 3,
                            maxLength: 30,
                          }}
                        />

                        <h5>Roster Settings</h5>
                        <RosterSettingsForms />

                        <h5>Points Settings</h5>
                        <PointsSettingsForms />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        create
                    </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

function LeagueJoinModal(props) {
    const [modalIsOpen , setModalIsOpen] = React.useState(false);

    useEffect(() => {
        if (props.showLeagueJoinModal) setModalIsOpen(true);
        else setModalIsOpen(false);
    }, [props.showLeagueJoinModal]);

    function closeModal() {
        setModalIsOpen(false);
        props.setShowLeagueJoinModal(false);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // post to api
        const code = data.get('Code');
        console.log(code);

        const ownerId = getDataCache("user").id;

        fetch(`${Routes.POST.JOINLEAGUE}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "league-id": code,
                'user': ownerId,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            callAndStore("LEAGUES", `${routes.LEAGUES}/`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // close modal
        closeModal();
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <div style={{borderBottom: "solid", borderColor: "lightgray", marginBottom: "3%"}}><h2>Join League</h2></div>
                <Box component="form"
                sx={{
                    my: 1,
                    mx: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
                onSubmit={handleSubmit}
                autoComplete="off"
                >
                    <div className='league-form-container'>
                        <h5>League Code</h5>
                        <TextField
                        required
                        fullWidth
                        id="Code"
                        label="Code"
                        name="Code"
                        sx = {{ mb: 3, width: '100%' }}
                        InputProps={{
                            inputMode: "numeric",
                            pattern: "^[a-zA-Z0-9]*$",
                            minLength: 3,
                            maxLength: 30,
                          }}
                        />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        join
                    </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

const Styles = {
    content: {
        
        width: '40%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };