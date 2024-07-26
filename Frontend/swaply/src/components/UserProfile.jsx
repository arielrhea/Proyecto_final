import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ usuario, authenticatedUserId }) => {
    const navigate = useNavigate();
    const profileImageURL = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

    const handleSettingsClick = () => {
        navigate('/account-settings'); // Redirige a la página de configuración
    };

    return (
        <div className="user-profile-wrapper">
            <div className="user-profile-header">
                <img 
                    src={profileImageURL} 
                    alt="Perfil" 
                    className="user-profile-image"
                />
                <div className="user-profile-header-content">
                    <h1 className="user-profile-username">{usuario[0].NombreUsuario}</h1>
                    <p className="user-profile-city">{usuario[0].ubicacion.Nombre}</p>
                    {/* Mostrar el botón de configuración solo si el ID del usuario es el mismo que el del perfil */}
                    {authenticatedUserId == usuario[0].ID && (
                        <button 
                            className="settings-button" 
                            onClick={handleSettingsClick}
                            aria-label="Configuración"
                        >
                            ⚙️
                        </button>
                    )}
                </div>
            </div>
            <div className="user-profile-info">
                <p><strong>Correo Electrónico:</strong> {usuario[0].correoelectronico}</p>
                <p><strong>Regalos Recibidos:</strong> {usuario[0].Regalos}</p>
                <p><strong>Regalos Ofrecidos:</strong> {usuario[0].Recibidos}</p>
            </div>
        </div>
    );
};

export default UserProfile;
