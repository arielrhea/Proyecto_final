import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Notification from '../components/Notification'; // Asegúrate de importar tu componente Notification

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [notification, setNotification] = useState(''); // Estado para manejar la notificación
    const { authenticateUser, username } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotification('Iniciando sesión...'); // Muestra la notificación inmediatamente al enviar el formulario

        authenticateUser(credentials)
            .then(() => {

               setNotification(`Bienvenido de nuevo ${localStorage.getItem('username')}!`)
                setTimeout(() => {
                    setNotification('');
                    navigate('/');
                }, 2000); // Redirige después de 2 segundos
            })
            .catch((error) => {
                console.error('Error al iniciar sesión:', error);
                setNotification('Error al iniciar sesión. Por favor, revisa tus credenciales e intenta de nuevo.');
                setTimeout(() => setNotification(''), 5000); // Oculta la notificación después de 5 segundos
            });
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-page">
            <Notification message={notification} onClose={() => setNotification('')} />
            <form onSubmit={handleSubmit}>
                <div>
                    <h1 className='titulo-account'>Iniciar sesión</h1>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='divButtons'>
                <button type="submit" className='inicio-button'>Iniciar sesión</button>
              
                <hr />
                <p>No tienes cuenta?</p>
                <button type="button" onClick={handleRegister} className='register-button'>Registrarme</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
