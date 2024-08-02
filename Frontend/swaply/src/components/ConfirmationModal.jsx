// ConfirmationModal.jsx
import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
                <p>{message}</p>
                <div className="confirmation-modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
                    <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
