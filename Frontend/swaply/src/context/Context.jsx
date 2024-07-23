import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const Context = createContext();

// Proveedor del contexto
export const ContextoProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState('');

    // Función para actualizar la búsqueda
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    return (
        <Context.Provider value={{ busqueda, handleBusquedaChange }}>
            {children}
        </Context.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useContexto = () => {
    return useContext(Context);
};
