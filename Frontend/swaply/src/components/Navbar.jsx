import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useContexto } from '../context/Context';

function NavBar() {
    const [estaDesplegableAbierto, setEstaDesplegableAbierto] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const desplegableRef = useRef(null);

    const alternarDesplegable = () => {
        setEstaDesplegableAbierto(!estaDesplegableAbierto);
    };

    const manejarClickFuera = (event) => {
        if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
            setEstaDesplegableAbierto(false);
        }
    };

    const { handleIdCategoriaChange } = useContexto();

    useEffect(() => {
        document.addEventListener('mousedown', manejarClickFuera);
        return () => {
            document.removeEventListener('mousedown', manejarClickFuera);
        };
    }, []);

    useEffect(() => {
        // Realizar la solicitud para obtener las categorías usando axios
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categorias');
                setCategorias(response.data); // Suponiendo que `response.data` es una lista de categorías
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        obtenerCategorias();
    }, []);

    return (
        <nav className="navbar">
            <div className="contenedor">
                <div ref={desplegableRef} className={`desplegable ${estaDesplegableAbierto ? 'abierto' : ''}`}>
                    <button onClick={alternarDesplegable} className="toggle-desplegable">☰ Todas las categorías</button>
                    <ul className="menu-desplegable">
                        {categorias.map((categoria) => (
                            <li key={categoria.ID}>
                                <a  onClick={() => handleIdCategoriaChange(categoria.ID)} >{categoria.Nombre}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-buttons">
                    <button className="nav-button"><a href="#agregados">Agregados Recientemente</a></button>
                    <button className="nav-button"><a href="#muebles">Muebles</a></button>
                    <button className="nav-button"><a href="#ropa">Ropa</a></button>
                    <button className="nav-button"><a href="#juguetes">Juguetes</a></button>
                    <button className="nav-button"><a href="#deportes">Deportes</a></button>
                    <button className="nav-button"><a href="#libros">Libros</a></button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
