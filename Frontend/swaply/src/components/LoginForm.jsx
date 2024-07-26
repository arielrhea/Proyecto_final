import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Agrega estilos según sea necesario

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { authenticateUser } = useAuth(); // Usa la función de autenticación
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser(credentials).then(() => {
            navigate('/');
        });
    };

    const handleRegister = () => {
        navigate('/register'); // Asumiendo que tienes una ruta '/register' para el formulario de registro
    };

    return (
        <div className="login-page">
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
                <button type="submit">Iniciar sesión</button>
                <button type="button" onClick={handleRegister}>Registrarme</button>
            </form>
        </div>
    );
};

export default LoginPage;
