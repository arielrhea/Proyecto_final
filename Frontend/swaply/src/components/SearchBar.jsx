import React from 'react';
import { useContexto } from '../context/Context'; // Asegúrate de usar la ruta correcta
import './SearchBar.css';

const SearchBar = () => {
    const { busqueda, handleBusquedaChange } = useContexto();
    const disablEnter=(event)=>{
        console.log(event)
        if(event.key=='Enter')
        {
            console.log('eskere')
            event.preventDefault();
        }
    }

    return (
        <form>
            <input className='searchBar'
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onKeyDown={disablEnter}
                onChange={handleBusquedaChange}
            />
        </form>
    );
};

export default SearchBar;
