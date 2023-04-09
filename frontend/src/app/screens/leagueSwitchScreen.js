import React, { useEffect } from 'react';
import Modal from 'react-modal';

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



    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={Styles}>
                <h2>Create League</h2>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    />
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    />
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    />
                    <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField id="outlined-search" label="Search field" type="search" />
                    <TextField
                    id="outlined-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="filled"
                    />
                    <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    />
                    <TextField
                    id="filled-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    />
                    <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    />
                    <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    />
                    <TextField
                    id="filled-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="filled"
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="standard"
                    />
                    <TextField
                    disabled
                    id="standard-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="standard"
                    />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    />
                    <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                    />
                    <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    />
                    <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    />
                    <TextField
                    id="standard-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="standard"
                    />
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