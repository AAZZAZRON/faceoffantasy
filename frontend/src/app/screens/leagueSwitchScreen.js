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
import {logout} from "../utils/AuthService";

export default function LeagueSwitchScreen(props) {
    
    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);
    const [showLeagueJoinModal, setShowLeagueJoinModal] = React.useState(false);

    const user = getDataCache("user").username;

    props.setMessage("My leagues");
    return (<>
        <LeagueCreationModal showLeagueCreationModal={showLeagueCreationModal} setShowLeagueCreationModal={setShowLeagueCreationModal}></LeagueCreationModal>
        <LeagueJoinModal showLeagueJoinModal={showLeagueJoinModal} setShowLeagueJoinModal={setShowLeagueJoinModal}></LeagueJoinModal>
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>{props.force ? 'Hello, ' + user + '! Please Select a League to Continue.' : 'Select a League'}</h2>
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
        <div style={{width: "10%"}}><button id='logout' onClick={logout}>logout</button></div>
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

    const defaultRosterSettings = {"Forwards Allowed" : 6, "Defensemen Allowed": 4, "Goalies Allowed": 2};
    const defaultPointsSettings = {"Goals" : 3, "Assists" : 2, "Penalty Minutes" : 0.5, "Shots" : 0.1, "Hits" : 0.5, "Power Play Points" : 1, "Short Handed Points" : 2, "Blocks" : 0.5, "Wins" : 3, "Losses" : 0, "Overtime Losses" : 1, "Saves" : 0.2, "Shutouts" : 3, "Goals Against" : -1};

    function RosterSettingsForms() {
        return (
            <div>
                {Object.keys(defaultRosterSettings).map((setting, index) => (
                    <div key={index}>
                        <TextField
                        id={setting}
                        label={setting}
                        name={setting}
                        type="number"
                        required
                        inputProps={{ min: 0, max: 10, step: 1 }}
                        defaultValue={defaultRosterSettings[setting]}
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
                {Object.keys(defaultPointsSettings).map((setting, index) => (
                    <div key={index}>
                        <TextField
                        id={setting}
                        label={setting}
                        name={setting}
                        type="number"
                        required
                        inputProps={{ min: -10, max: 10, step: 0.1 }}
                        defaultValue={defaultPointsSettings[setting]}
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

        const ownerId = getDataCache("user").id;

        fetch(`${Routes.POST.CREATELEAGUE}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": leagueName,
                'owner': ownerId,
                "numForwards": data.get('Forwards Allowed'),
                "numDefensemen": data.get('Defensemen Allowed'),
                "numGoalies": data.get('Goalies Allowed'),
                "goals": data.get('Goals'),
                "assists": data.get('Assists'),
                "pim": data.get('Penalty Minutes'),
                "shots": data.get('Shots'),
                "hits": data.get('Hits'),
                "powerPlayPoints": data.get('Power Play Points'),
                "shortHandedPoints": data.get('Short Handed Points'),
                "blocked": data.get('Blocks'),
                "wins": data.get('Wins'),
                "losses": data.get('Losses'),
                "ot": data.get('Overtime Losses'),
                "saves": data.get('Saves'),
                "shutouts": data.get('Shutouts'),
                "goalsAgainst": data.get('Goals Against'),
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('POST request success:', data);
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
