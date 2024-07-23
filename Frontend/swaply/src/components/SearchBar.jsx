import React from 'react';
import { useContexto } from '../context/Context'; // Asegúrate de usar la ruta correcta
import './SearchBar.css';

const SearchBar = () => {
    const { busqueda, handleBusquedaChange } = useContexto();

    return (
        <form action="get">
            <input className='searchBar'
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={handleBusquedaChange}
            />
        </form>
    );
};

export default SearchBar;
