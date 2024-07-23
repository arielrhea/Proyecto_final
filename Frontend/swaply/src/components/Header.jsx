import React from 'react';
import SearchBar from './SearchBar';
import './Header.css';

const Header = () => {
    return (
        <header>
            <h2 className='swaply'>Swaply</h2>
            <SearchBar className="barra" />
            <div className='botones'>
            <button className='buttonHeader'>Iniciar Sesión</button>
            <button className='buttonHeader'>Regístrate</button>
            </div>
        </header>
    );
};

export default Header;
