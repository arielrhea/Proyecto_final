import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div>
            <img src={user.FotoPerfil} alt="Perfil" />
            <h2>{user.NombreUsuario}</h2>
            <p>{user.Ciudad}</p>
        </div>
    );
};

export default UserProfile;
