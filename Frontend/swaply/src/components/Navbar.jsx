import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useContexto } from '../context/Context';

function NavBar() {
    const [estaDesplegableAbierto, setEstaDesplegableAbierto] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const desplegableRef = useRef(null);

    // Obtener funciones y valores del contexto
    const { idCategoria, nombreCategoria, handleIdCategoriaChange } = useContexto();

    const alternarDesplegable = () => {
        setEstaDesplegableAbierto(!estaDesplegableAbierto);
    };

    const manejarClickFuera = (event) => {
        if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
            setEstaDesplegableAbierto(false);
        }
    };

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

    // Función para deseleccionar la categoría
    const deseleccionarCategoria = () => {
        handleIdCategoriaChange(0, ''); // Pasar null o una cadena vacía para deseleccionar
    };

    return (
        <nav className="navbar">
            <div className="contenedor">
                <div ref={desplegableRef} className={`desplegable ${estaDesplegableAbierto ? 'abierto' : ''}`}>
                    <button onClick={alternarDesplegable} className="toggle-desplegable">
                        {nombreCategoria || '☰ Todas las categorías'} 
                        {nombreCategoria && (
                           <span className="deselect-btn" onClick={() => {
                            deseleccionarCategoria();
                            alternarDesplegable();
                        }}>
                             ❌
                        </span>
                        )}
                    </button>
                    <ul className="menu-desplegable">
                        {categorias.map((categoria) => (
                            <li key={categoria.ID}>
                                <a 
                                    onClick={() => {handleIdCategoriaChange(categoria.ID, categoria.Nombre);
                                        alternarDesplegable();
                                    }}
                                >
                                    {categoria.Nombre}
                                </a>
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
