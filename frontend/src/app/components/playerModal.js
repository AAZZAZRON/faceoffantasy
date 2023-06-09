import React from 'react';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "../../css/playerModal.css";
import Routes from "../utils/routes";
import { useSelector, useDispatch } from 'react-redux';
import { setLoaded } from '../features/loaded';
import { toast } from 'react-toastify';

export const PlayerModal = (props) => {
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        props.setShowModal(false);
    }

    useEffect(() => {
        if (props.showModal) openModal();
        else closeModal();
    }, [props.showModal]);

    const player = props.player;
    const position = props.position;
    const NHLteam = props.team;
    const owner = props.owner;
    const currentTeam = useSelector((state) => state.teams.currentTeam);

    const rosterStatus = (player) => {
        if (player.rosterStatus === 'Y') return 'Healthy';
        if (player.rosterStatus === 'I') return 'Injured';
        // console.log(player.firstName, player.lastName, player.rosterStatus);
        return 'Unknown';
    }

    const addPlayer = () => {
        console.log("Adding player");

        fetch(`${Routes.POST.ADDPLAYER}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "teamId": currentTeam.id,
                "playerId": player.id,
                "position": position.type,
        }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                dispatch(setLoaded(false));
                toast.success(data.message);
                closeModal();
            } else {
                toast.error(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const dropPlayer = () => {
        console.log("Dropping player");

        fetch(`${Routes.POST.DROPPLAYER}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "teamId": owner.id, 
                "playerId": player.id,
        }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                dispatch(setLoaded(false));
                toast.success(data.message);
                closeModal();
            } else {
                toast.error(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const togglePlayerOnWatchList = () => {
        
    }

    const addDropButton = () => {
        if (owner.teamName === "None (Free Agent)") {
            return (
                <div class='action-button add-player' onClick={addPlayer}>Add</div>
            )
        } else if (owner.id === currentTeam.id) {
            return (
                <div class='action-button drop-player' onClick={dropPlayer}>Drop</div>
            )
        } else {
            return (
                <div class='action-button owned-already'>Owned By {owner.teamName}</div>
            )
        }
    }

    const watchListButton = () => {
        return (
            <div class='action-button'>Interested In</div>
        )
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Player Modal"
                style={modalStyles}
            >
                <div class="modal-head">
                    <img src={player.avatar} alt="headshot" class="modal-headshot"/>
                    <div class="modal-head-player-info-1">
                        <div class="first-name">{player.firstName}</div>
                        <div class="last-name">{player.lastName}</div>
                        <div class='team-name'>{NHLteam.name}</div>
                        <div class='stat-table'>
                            <div class='stat'>
                                <div class='stat-name'>ELIG</div>
                                <div class='stat-value'>{position.abbreviation}</div>
                            </div>
                            <div class='stat'>
                                <div class='stat-name'>MANAGER</div>
                                <div class='stat-value'>{owner.teamName}</div>
                            </div>
                            <div class='stat'>
                                <div class='stat-name'>STATUS</div>
                                <div class={rosterStatus(player) === "Injured" ? 'stat-value injured' : 'stat-value healthy'}>{rosterStatus(player)}</div>
                            </div>
                        </div>
                    </div>
                    <div class='modal-head-player-info-2'>
                        <div class='player-stat-name'>JERSEY NUMBER</div>
                        <div class='player-stat-value'>{player.primaryNumber}</div>
                        <div class='player-stat-name'>TOTAL POINTS</div>
                        <div class='player-stat-value'>{player.fantasyPoints}</div>
                        <div class='player-stat-name'>AVERAGE POINTS</div>
                        <div class='player-stat-value'>{player.avgFantasyPoints}</div>
                    </div>
                </div>
                <div class='modal-body'>
                    {addDropButton()}
                    {watchListButton()}
                </div>
                <button onClick={closeModal}>close</button>
            </Modal>

        </>
    )
}

Modal.setAppElement(document.getElementById('root'));

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '700px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        boxShadow: '5px 5px 3px #818181',
    }
};
