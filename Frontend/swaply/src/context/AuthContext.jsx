import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                // Aquí asumo que el token representa al usuario
                setUserId(response.data.Token);
                setIsAuthenticated(true);
                localStorage.setItem('token', response.data.Token); // Opcional: almacenar el token en localStorage
            }
        } catch (error) {
            console.error('Error de autenticación:', error);
        }
    };

   

    // Función para cerrar sesión
    const logout = () => {
        setUserId(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token'); // Opcional: limpiar localStorage
    };

    return (
        <AuthContext.Provider value={{ userId, isAuthenticated, authenticateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
