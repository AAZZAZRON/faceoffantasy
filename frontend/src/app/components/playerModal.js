import React from 'react';
import { useState, useEffect } from "react";
import Modal from 'react-modal';

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

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div>{props.player.firstName}</div>
                <button onClick={closeModal}>close</button>
            </Modal>

        </>
    )
}
