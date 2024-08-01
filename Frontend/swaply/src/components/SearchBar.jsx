import React from 'react';
import { useContexto } from '../context/Context';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { busqueda, handleBusquedaChange } = useContexto();
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate('/', { state: { search: busqueda } });
        }
    };

    return (
        <form className='searchForm'>
            <input
                className='searchBar'
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onKeyDown={handleKeyDown}
                onChange={handleBusquedaChange}
            />
        </form>
    );
};

export default SearchBar;
