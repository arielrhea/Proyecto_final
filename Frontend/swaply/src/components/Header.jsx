import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según la ubicación de tu AuthContext
import SearchBar from './SearchBar';
import './Header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Header = () => {
    const { userId, isAuthenticated, logout } = useAuth();
    const [userData, setUserData] = useState({
        username: '', // No tiene valor predeterminado
        img: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' // Imagen predeterminada
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/usuario/${userId}`);
                    const user = response.data[0][0]; // Extrae el primer elemento del array

                    setUserData({
                        username: user.NombreUsuario || '', // No tiene valor predeterminado
                        img: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' // user.FotoPerfil ? `http://localhost:8000/images/${user.FotoPerfil}` :
                    });
                    setLoading(false);
                } catch (error) {
                    console.error('Error al cargar los datos del usuario:', error);
                    setError('Error al cargar datos.');
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [userId]);

    const handleProfileClick = () => {
        navigate(`/profile/${userId}`); // Navega al perfil del usuario
    };

    const handleLogout = () => {
        logout(); // Ejecuta la función logout del contexto
        navigate('/'); // Redirige al usuario a la página de inicio
    };

    return (
        <header>
            <a href="/" className='logoLink'>
                <h2 className='swaply'>Swaply</h2>
            </a>
            <SearchBar className="barra" />
            <div className='botones'>
                {isAuthenticated ? (
                    <>
                        {!loading && (
                            <div className='user-info' onClick={handleProfileClick}>
                                <img src={userData.img} alt={userData.username} className='user-profile-image' />
                                {userData.username && <p className='username'>{userData.username}</p>}
                            </div>
                        )}
                        <button className='buttonHeader' onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <a href="/login" className='buttonHeader'>Iniciar Sesión</a>
                        <a href="/register" className='buttonHeader'>Regístrate</a>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
