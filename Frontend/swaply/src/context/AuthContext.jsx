import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    const [img, setImg] = useState(localStorage.getItem('img') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Función para autenticar al usuario
    const authenticateUser = async (credentials) => {
        try {
            // Enviar credenciales en los encabezados
            const response = await axios.post('http://localhost:8000/api/login', null, {
                headers: {
                    'email': credentials.email,
                    'password': credentials.password
                }
            });

            if (response.data.Token) {
                const { ID, username, img } = response.data.usuario;
                console.log('Authenticated user:', { ID, username, img }); // Verificar datos autenticados
                setUserId(ID);
                setUsername(username);
                setImg(img);
                setIsAuthenticated(true);
                localStorage.setItem('token', response.data.Token);
                localStorage.setItem('userId', ID);
                localStorage.setItem('username', username);
                localStorage.setItem('img', img);
                console.log(userId)
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setUserId(null);
        setUsername(null);
        setImg(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('img');
    };

    return (
        <AuthContext.Provider value={{ userId, username, img, isAuthenticated, authenticateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
