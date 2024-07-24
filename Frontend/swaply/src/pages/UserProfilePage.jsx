import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import './UserProfilePage.css';
import LoadingScreen from '../components/LoadingScreen';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
    const { id } = useParams();
    const [usuario, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/usuario/${id}`)
            .then(response => {
                // Verifica si la respuesta es un array y extrae el primer elemento
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los datos del usuario:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="user-profile-page">
            <div className="user-profile-container">
                {loading && <LoadingScreen />}
                {error && <div className="error-message">Error al cargar el perfil del usuario.</div>}
                {usuario ? (
                    <>
                        <UserProfile usuario={usuario} />
                    </>
                ) : <div>Perfil de usuario no encontrado.</div>}
            </div>
        </div>
    );
};

export default UserProfilePage;
