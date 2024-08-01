import React from 'react';
import { useContexto } from '../context/Context';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { busqueda, handleBusquedaChange } = useContexto();
    const navigate = useNavigate();

    const disablEnter=(event)=>{
        console.log(event)
        if(event.key=='Enter')
        {
            console.log({busqueda})
            event.preventDefault();
            navigate('/', { state: { search: busqueda } }); // Redirige a la homepage con el valor de búsqueda
        }
    }

    return (
        <form>
            <input className='searchBar'
                type="text"
                placeholder="   Buscar..."
                value={busqueda}
                onKeyDown={disablEnter}
                onChange={handleBusquedaChange}
            />
        </form>
    );
};

export default SearchBar;
