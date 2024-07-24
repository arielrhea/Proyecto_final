import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useContexto } from '../context/Context';

function NavBar() {
    const [estaDesplegableAbierto, setEstaDesplegableAbierto] = useState(false);
    const [estadosDesplegableAbierto, setEstadosDesplegableAbierto] = useState(false);
    const [ubicacionesDesplegableAbierto, setUbicacionesDesplegableAbierto] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('');
    const [ubicaciones, setUbicaciones] = useState([]);
    const desplegableRef = useRef(null);
    const estadosDesplegableRef = useRef(null);
    const ubicacionesDesplegableRef = useRef(null);

    // Obtener funciones y valores del contexto
    const { idCategoria, nombreCategoria, handleIdCategoriaChange, handleNombreEstado, handleNombreUbicacion, handleReciente } = useContexto();

    const alternarDesplegableCategorias = () => {
        setEstaDesplegableAbierto(!estaDesplegableAbierto);
    };

    const alternarDesplegableEstados = () => {
        setEstadosDesplegableAbierto(!estadosDesplegableAbierto);
    };

    const alternarDesplegableUbicaciones = () => {
        setUbicacionesDesplegableAbierto(!ubicacionesDesplegableAbierto);
    };

    const manejarClickFuera = (event) => {
        if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
            setEstaDesplegableAbierto(false);
        }
        if (estadosDesplegableRef.current && !estadosDesplegableRef.current.contains(event.target)) {
            setEstadosDesplegableAbierto(false);
        }
        if (ubicacionesDesplegableRef.current && !ubicacionesDesplegableRef.current.contains(event.target)) {
            setUbicacionesDesplegableAbierto(false);
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

    useEffect(() => {
        // Realizar la solicitud para obtener las ubicaciones usando axios
        const obtenerUbicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ubicaciones');
                setUbicaciones(response.data); // Suponiendo que `response.data` es una lista de ubicaciones
            } catch (error) {
                console.error('Error al obtener las ubicaciones:', error);
            }
        };

        obtenerUbicaciones();
    }, []);

    // Función para deseleccionar la categoría
    const deseleccionarCategoria = () => {
        handleIdCategoriaChange(0, ''); // Pasar 0 (idcategoria) y un texto (nombrecategoria) vacío para deseleccionar
    };

    // Función para deseleccionar el estado
    const deseleccionarEstado = () => {
        setEstadoSeleccionado('');
        handleNombreEstado('');
    };

    // Función para deseleccionar la ubicación
    const deseleccionarUbicacion = () => {
        setUbicacionSeleccionada('');
        handleNombreUbicacion('');
    };

    const estados = [
        { id: 1, nombre: 'Nuevo' },
        { id: 2, nombre: 'Usado' },
        { id: 3, nombre: 'Muy Usado' }
    ];

    return (
        <nav className="navbar">
            <div className="nav-buttons">
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
                                            setEstadoSeleccionado(estado.nombre);
                                        }}
                                    >
                                        {estado.nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desplegable de Ubicaciones */}
                    <div ref={ubicacionesDesplegableRef} className={`desplegable ${ubicacionesDesplegableAbierto ? 'abierto' : ''}`}>
                        <button onMouseEnter={alternarDesplegableUbicaciones} onMouseLeave={alternarDesplegableUbicaciones} className="toggle-desplegable">
                            {ubicacionSeleccionada || '☰ Todas las ubicaciones'}
                            {ubicacionSeleccionada && (
                                <span className="deselect-btn" onClick={() => deseleccionarUbicacion()}>
                                    ❌
                                </span>
                            )}
                        </button>
                        <ul className="menu-desplegable" onMouseLeave={alternarDesplegableUbicaciones}>
                            {ubicaciones.map((ubicacion) => (
                                <li key={ubicacion.ID}>
                                    <a
                                        onClick={() => {
                                            handleNombreUbicacion(ubicacion.ID);
                                            alternarDesplegableUbicaciones();
                                            setUbicacionSeleccionada(ubicacion.Nombre);
                                        }}
                                    >
                                        {ubicacion.Nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="nav-button" onClick={handleReciente}>Agregados Recientemente</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
