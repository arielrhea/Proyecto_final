import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const Context = createContext();

// Proveedor del contexto
export const ContextoProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState('');
    const [idCategoria, setIdCategoria] = useState(0);
    const [nombreCategoria, setNombreCategoria] = useState(''); // Añadido para manejar el nombre de la categoría
    const [nombreEstado , setNombreEstado]= useState('');
    const [recientes, setRecientes]=useState(0);
    const [ubicacion, setUbicacion]=useState(0);

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
        
    };

    const handleIdCategoriaChange = (id, nombre) => {
        setIdCategoria(id);
        setNombreCategoria(nombre); // Actualiza el nombre de la categoría
    };

    const handleNombreUbicacion=(ubi)=>{
        setUbicacion(ubi);
        console.log('hello');
    }

    const handleNombreEstado=(nombre)=>{
        setNombreEstado(nombre);
        
    }
    const handleReciente=()=>{
        if (recientes===0){
            setRecientes(1);
        }
        else{
            setRecientes(0);
        }
    }

    return (
        <Context.Provider value={{ busqueda, handleBusquedaChange, idCategoria, nombreCategoria, handleIdCategoriaChange, nombreEstado, handleNombreEstado, handleReciente, recientes, handleNombreUbicacion,ubicacion }}>
            {children}
        </Context.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useContexto = () => {
    return useContext(Context);
};
