import React, { useEffect } from 'react';
import Modal from 'react-modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "../../css/leagueSwitchScreen.css";

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
        console.log(props.showLeagueCreationModal);
        if (props.showLeagueCreationModal) setModalIsOpen(true);
        else setModalIsOpen(false);
    }, [props.showLeagueCreationModal]);

    function closeModal() {
        setModalIsOpen(false);
        props.setShowLeagueCreationModal(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        let leagueName = data.get('leagueName')+"";
        if(leagueName.length < 1) {
            alert("Please enter a league name.");
            return;
        }

    }

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <h2>Create League</h2>
                <Box component="form"
                sx={{
                    my: 1,
                    mx: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
                autoComplete="off"
                >
                    <div className='league-form-container'>
                        <div>League Name</div>
                        <TextField
                        required
                        fullWidth
                        id="outlined-required"
                        label="Required"
                        defaultValue="Hello World"
                        />
                        <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
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

const Styles = {
    content: {
        
        width: '50%',
        height: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };