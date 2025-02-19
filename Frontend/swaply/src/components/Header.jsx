import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Ajusta la ruta según la ubicación de tu AuthContext
import SearchBar from './SearchBar';
import './Header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Notification from '../components/Notification';

const Header = () => {
    const { userId, isAuthenticated, logout } = useAuth();
    const [userData, setUserData] = useState({
        username: localStorage.getItem('username'), // No tiene valor predeterminado
        img: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' // Imagen predeterminada
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Obtén la función de navegación
    const [notification, setNotification]=useState('');
    const BASE_USER_IMAGE_URL = 'http://localhost:8000/assets/img/usuarios/';
    
    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/usuario/${userId}`);
                    const user = response.data[0][0]; // Extrae el primer elemento del array

                    const profileImage = `${BASE_USER_IMAGE_URL}${user.FotoPerfil}`;

                    setUserData({
                        username: user.NombreUsuario || '', // No tiene valor predeterminado
                        img: profileImage
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
        setNotification(`Adios ${localStorage.getItem('username')}! Hasta la próxima`)
        logout(); // Ejecuta la función logout del contexto
       
        setTimeout(() => {
            setNotification('')
            navigate('/')
        }, 3000);
        // Redirige al usuario a la página de inicio
    };

    return (
        <header>
             <Notification message={notification} onClose={() => setNotification('')} />
              <a href="/" className='logoLink'>
                <img src="/L1_Swaply_Logo_red.png" alt="Swaply Logo" className='swaplyLogo' />
            </a>
            <div className="search-container">
                <SearchBar />
            </div>
            <div className='botones'>
                {isAuthenticated ? (
                    <>
                      <button className='buttonAltaProducto' onClick={()=>navigate('/new-product')}>Haz un regalo</button>
                      <button className='buttonHeader' onClick={()=>navigate('/chats')}>Chats</button>
                       
                      
                        <button className='buttonHeader' onClick={handleLogout}>
                            Logout
                        </button>
                        {!loading && (
                            
                            <div className='user-info-header' onClick={handleProfileClick}>
                                <img src={userData.img} alt={userData.username} className='user-profile-image-header' />
                                {userData.username && <p className='username-header'>{localStorage.getItem('username')}</p>}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <a href="/login" className='buttonHeader-inicio'>Iniciar Sesión</a>
                        <a href="/register" className='buttonHeader-register'>Regístrate</a>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
