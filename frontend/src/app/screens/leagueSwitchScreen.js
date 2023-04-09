import React, { useEffect } from 'react';
import Modal from 'react-modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "../../css/leagueSwitchScreen.css";
import Routes from '../utils/misc/routes';

export default function LeagueSwitchScreen(props) {
    
    const [showLeagueCreationModal, setShowLeagueCreationModal] = React.useState(false);

    props.setMessage("My leagues");
    return (<>
        <LeagueCreationModal showLeagueCreationModal={showLeagueCreationModal} setShowLeagueCreationModal={setShowLeagueCreationModal}></LeagueCreationModal>
        <div className={"league-container"}>
            <div className={"top-bar"}>
                <h2>Select a League</h2>
                <div className={"enter-league-buttons"}>
                    <button className={"enter-league-button"} style={{fontWeight: "bold"}}>Join League</button>
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
        fetch(`${Routes.POST.CREATELEAGUE}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Name": leagueName,
                "NumForwards": rosterSettings["Forwards Allowed"],
                "NumDefensemen": rosterSettings["Defensemen Allowed"],
                "NumGoalies": rosterSettings["Goalies Allowed"],
                "Goals": pointsSettings["Goals"],
                "Assists": pointsSettings["Assists"],
                "Pim": pointsSettings["Penalty Minutes"],
                "Shots": pointsSettings["Shots"],
                "Hits": pointsSettings["Hits"],
                "PowerPlayPoints": pointsSettings["Power Play Points"],
                "ShortHandedPoints": pointsSettings["Short Handed Points"],
                "Blocked": pointsSettings["Blocks"],
                "Wins": pointsSettings["Wins"],
                "Losses": pointsSettings["Losses"],
                "Ot": pointsSettings["Overtime Losses"],
                "Saves": pointsSettings["Saves"],
                "Shutouts": pointsSettings["Shutouts"],
                "GoalsAgainst": pointsSettings["Goals Against"]
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
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