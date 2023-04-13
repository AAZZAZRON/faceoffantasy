import React, { useEffect } from 'react';
import Modal from 'react-modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "../../css/leagueSwitchScreen.css";
import Routes from '../utils/routes';
import { callAndStore } from '../utils/callApi';
import { getUser } from '../utils/AuthService';
import routes from '../utils/routes';

export function LeagueCreationModal(props) {
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
        const teamName = data.get('Team Name');
        const ownerId = getUser().id;

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
            callAndStore("LEAGUES", `${routes.LEAGUES}/`).then(() => {
                // create team
                fetch(`${Routes.POST.CREATETEAM}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": teamName,
                        'owner': ownerId,
                        "league": data.id,
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('POST request success:', data);
                    callAndStore("user", `${routes.USER}/${ownerId}/`).then(() => {
                        callAndStore("TEAMS", `${routes.TEAMS}/`).then(() => {
                            callAndStore("USERS", `${routes.USER}/`).then(() => {
                                props.updateTeamsAndLeagues();
                                closeModal();
                            });
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <div style={{borderBottom: "solid", borderColor: "lightgray", marginBottom: "3%"}}>
                    <h2>Create League</h2>
                </div>
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
                        label="League Name"
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
                        <p>Please enter how many forwards, defensemen, and goalies are allowed per team.</p>
                        <RosterSettingsForms />

                        <h5>Points Settings</h5>
                        <p>Please provide how many fantasy points each statistic gives. Decimals may be used to tenths.</p>
                        <PointsSettingsForms />

                        <h5>Team Name</h5>
                        <p>Your team in the league will be created automatically when you create a league. Just provide a name for us :)</p>

                        <TextField
                        required
                        fullWidth
                        id="Team Name"
                        label="Your Team's Name"
                        name="Team Name"
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
                            create
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export function LeagueJoinModal(props) {
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
        const teamName = data.get('Team Name');
        const ownerId = getUser().id;

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
            console.log('POST request success:', data);
            callAndStore("LEAGUES", `${routes.LEAGUES}/`).then(() => {
                // create team
                fetch(`${Routes.POST.CREATETEAM}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": teamName,
                        'owner': ownerId,
                        "league": data.id,
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('POST request success:', data);
                    callAndStore("user", `${routes.USER}/${ownerId}/`).then(() => {
                        callAndStore("TEAMS", `${routes.TEAMS}/`).then(() => {
                            callAndStore("USERS", `${routes.USER}/`).then(() => {
                                props.updateTeamsAndLeagues();
                                closeModal();
                            });
                        });
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <div style={{borderBottom: "solid", borderColor: "lightgray", marginBottom: "3%"}}>
                    <h2>Join League</h2>
                </div>
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
                        <h5>Team Name</h5>
                        <p>Your team in the league will be created automatically when you create a league. Just provide a name for us :)</p>

                        <TextField
                        required
                        fullWidth
                        id="Team Name"
                        label="Your Team's Name"
                        name="Team Name"
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
