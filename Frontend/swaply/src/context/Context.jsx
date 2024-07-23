import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const Context = createContext();

// Proveedor del contexto
export const ContextoProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState('');
    const [idCategoria, setIdCategoria] = useState('');

    // Función para actualizar la búsqueda
    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    const handleIdCategoriaChange =(id)=>{
        console.log(idCategoria)
        setIdCategoria(id);
    };

    return (
        <Context.Provider value={{ busqueda, handleBusquedaChange, idCategoria, handleIdCategoriaChange }}>
            {children}
        </Context.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useContexto = () => {
    return useContext(Context);
};
