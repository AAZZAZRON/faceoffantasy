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
                    <div class="modal-head-player-info">
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
                                <div class='stat-value'>{position.code}</div>
                            </div>
                            <div class='stat'>
                                <div class='stat-name'>STATUS</div>
                                <div class='stat-value'>{position.code}</div>
                            </div>
                        </div>
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
        width: '800px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        boxShadow: '5px 5px 3px #818181',
    }
};
