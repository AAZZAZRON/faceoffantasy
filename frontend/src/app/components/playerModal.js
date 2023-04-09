import React from 'react';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "../../css/playerModal.css";

export const PlayerModal = (props) => {
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
    const team = props.team;
    const totalPoints = 69420;
    var averagePoints;
    if (player.games === 0) averagePoints = (0).toFixed(1);
    else if (position.code === "G") averagePoints =( Math.round(totalPoints / player.gamesStarted * 10) / 10).toFixed(1);
    else averagePoints = (Math.round(totalPoints / player.games * 10) / 10).toFixed(1);

    const rosterStatus = (player) => {
        if (player.rosterStatus === 'Y') return 'Healthy';
        if (player.rosterStatus === 'I') return 'Injured';
        console.log(player.firstName, player.lastName, player.rosterStatus);
        return 'Unknown';
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
                        <div class='team-name'>{team.name}</div>
                        <div class='stat-table'>
                            <div class='stat'>
                                <div class='stat-name'>ELIG</div>
                                <div class='stat-value'>{position.code}</div>
                            </div>
                            <div class='stat'>
                                <div class='stat-name'>MANAGER</div>
                                <div class='stat-value'>need to fill this out!</div>
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
                        <div class='player-stat-name'>AVERAGE POINTS</div>
                        <div class='player-stat-value'>{totalPoints}</div>
                        <div class='player-stat-name'>TOTAL POINTS</div>
                        <div class='player-stat-value'>{averagePoints}</div>
                    </div>
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
