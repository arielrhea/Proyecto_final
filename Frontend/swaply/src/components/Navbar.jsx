import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useContexto } from '../context/Context';

function NavBar() {
    const [estaDesplegableAbierto, setEstaDesplegableAbierto] = useState(false);
    const [estadosDesplegableAbierto, setEstadosDesplegableAbierto] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const desplegableRef = useRef(null);
    const estadosDesplegableRef = useRef(null);

    // Obtener funciones y valores del contexto
    const { idCategoria, nombreCategoria, handleIdCategoriaChange, handleNombreEstado } = useContexto();

    const alternarDesplegableCategorias = () => {
        setEstaDesplegableAbierto(!estaDesplegableAbierto);
    };

    const alternarDesplegableEstados = () => {
        setEstadosDesplegableAbierto(!estadosDesplegableAbierto);
    };

    const manejarClickFuera = (event) => {
        if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
            setEstaDesplegableAbierto(false);
        }
        if (estadosDesplegableRef.current && !estadosDesplegableRef.current.contains(event.target)) {
            setEstadosDesplegableAbierto(false);
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
        handleIdCategoriaChange(0, ''); // Pasar 0 (idcategoria) y un texto (nombrecategoria) vacío para deseleccionar
    };

    // Función para deseleccionar el estado
    const deseleccionarEstado = () => {
        setEstadoSeleccionado('');
    };

    const estados = [
        { id: 1, nombre: 'Nuevo' },
        { id: 2, nombre: 'Usado' },
        { id: 3, nombre: 'Muy Usado' }
    ];

    return (
        <nav className="navbar">
            <div className="contenedor">
                <div ref={desplegableRef} className={`desplegable ${estaDesplegableAbierto ? 'abierto' : ''}`}>
                    <button onMouseEnter={alternarDesplegableCategorias} onMouseLeave={alternarDesplegableCategorias} className="toggle-desplegable">
                        {nombreCategoria || '☰ Todas las categorías'}
                        {nombreCategoria && (
                            <span className="deselect-btn" onClick={() => deseleccionarCategoria()}>
                                ❌
                            </span>
                        )}
                    </button>
                    <ul className="menu-desplegable" onMouseLeave={alternarDesplegableCategorias}>
                        {categorias.map((categoria) => (
                            <li key={categoria.ID}>
                                <a
                                    onClick={() => {
                                        handleIdCategoriaChange(categoria.ID, categoria.Nombre);
                                        alternarDesplegableCategorias();
                                    }}
                                >
                                    {categoria.Nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Desplegable de Estados */}
                <div ref={estadosDesplegableRef} className={`desplegable ${estadosDesplegableAbierto ? 'abierto' : ''}`}>
                    <button onMouseEnter={alternarDesplegableEstados} onMouseLeave={alternarDesplegableEstados} className="toggle-desplegable">
                        {estadoSeleccionado || '☰ Estado del producto'}
                        {estadoSeleccionado && (
                            <span className="deselect-btn" onClick={() => deseleccionarEstado()}>
                                ❌
                            </span>
                        )}
                    </button>
                    <ul className="menu-desplegable" onMouseLeave={alternarDesplegableEstados}>
                        {estados.map((estado) => (
                            <li key={estado.id}>
                                <a
                                    onClick={() => {
                                        handleNombreEstado(estado.nombre);
                                        alternarDesplegableEstados();
                                    }}
                                >
                                    {estado.nombre}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="nav-buttons">
                   
                  
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
