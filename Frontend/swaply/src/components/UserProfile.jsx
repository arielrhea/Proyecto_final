import React from 'react';
import './UserProfile.css';

const UserProfile = ({ usuario }) => {
    // URL del mockup para la imagen de perfil
    const profileImageURL = "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg";

    return (
        <div className="user-profile-wrapper">
            <div className="user-profile-header">
                <img 
                    src={profileImageURL} 
                    alt="Perfil" 
                    className="user-profile-image"
                />
                <h1 className="user-profile-username">{usuario.NombreUsuario}</h1>
                <p className="user-profile-city">{usuario.Ciudad}</p>
            </div>
            <div className="user-profile-info">
                <p><strong>Correo Electrónico:</strong> {usuario.correoelectronico}</p>
                <p><strong>Regalos Recibidos:</strong> {usuario.Regalos}</p>
                <p><strong>Regalos Ofrecidos:</strong> {usuario.Recibidos}</p>
            </div>
        </div>
    );
};

export default UserProfile;
