import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';

const UserProfilePage = ({ match }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`/api/usuarios/${match.params.id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [match.params.id]);

    return (
        <div>
            {user ? <UserProfile user={user} /> : <p>Cargando...</p>}
        </div>
    );
};

export default UserProfilePage;
