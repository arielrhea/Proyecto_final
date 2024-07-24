import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const Context = createContext();

// Proveedor del contexto
export const ContextoProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState('');
    const [idCategoria, setIdCategoria] = useState(0);
    const [nombreCategoria, setNombreCategoria] = useState(''); // Añadido para manejar el nombre de la categoría
    const [nombreEstado , setNombreEstado]= useState('');

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
        
    };

    const handleIdCategoriaChange = (id, nombre) => {
        setIdCategoria(id);
        setNombreCategoria(nombre); // Actualiza el nombre de la categoría
    };

    const handleNombreEstado=(nombre)=>{
        setNombreEstado(nombre);
        
    }

    return (
        <Context.Provider value={{ busqueda, handleBusquedaChange, idCategoria, nombreCategoria, handleIdCategoriaChange, nombreEstado, handleNombreEstado }}>
            {children}
        </Context.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useContexto = () => {
    return useContext(Context);
};
