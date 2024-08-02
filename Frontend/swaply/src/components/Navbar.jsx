import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useContexto } from '../context/Context';
import { Navigate, useNavigate } from 'react-router-dom';

function NavBar() {
    const [estaDesplegableAbierto, setEstaDesplegableAbierto] = useState(false);
    const [mouseSobreDesplegable, setMouseSobreDesplegable] = useState(false);
    const [mouseSobreBoton, setMouseSobreBoton] = useState(false);

    const [estadosDesplegableAbierto, setEstadosDesplegableAbierto] = useState(false);
    const [mouseSobreDesplegableEstados, setMouseSobreDesplegableEstados] = useState(false);
    const [mouseSobreBotonEstados, setMouseSobreBotonEstados] = useState(false);

    const [ubicacionesDesplegableAbierto, setUbicacionesDesplegableAbierto] = useState(false);
    const [mouseSobreDesplegableUbicaciones, setMouseSobreDesplegableUbicaciones] = useState(false);
    const [mouseSobreBotonUbicaciones, setMouseSobreBotonUbicaciones] = useState(false);

    const [categorias, setCategorias] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('');
    const [ubicaciones, setUbicaciones] = useState([]);
    const [butonActive, setButtonActive] = useState(1);

    const desplegableRef = useRef(null);
    const estadosDesplegableRef = useRef(null);
    const ubicacionesDesplegableRef = useRef(null);

    const navigate = useNavigate();

    const { idCategoria, nombreCategoria, handleIdCategoriaChange, handleNombreEstado, handleNombreUbicacion, handleReciente } = useContexto();

    useEffect(() => {
        if (mouseSobreDesplegable || mouseSobreBoton) {
            setEstaDesplegableAbierto(true);
        } else {
            setEstaDesplegableAbierto(false);
        }
    }, [mouseSobreDesplegable, mouseSobreBoton]);

    const handleMouseEnterBoton = () => {
        setMouseSobreBoton(true);
    };

    const handleMouseLeaveBoton = () => {
        setMouseSobreBoton(false);
    };

    const handleMouseEnterDesplegable = () => {
        setMouseSobreDesplegable(true);
    };

    const handleMouseLeaveDesplegable = () => {
        setMouseSobreDesplegable(false);
    };

    useEffect(() => {
        if (mouseSobreDesplegableEstados || mouseSobreBotonEstados) {
            setEstadosDesplegableAbierto(true);
        } else {
            setEstadosDesplegableAbierto(false);
        }
    }, [mouseSobreDesplegableEstados, mouseSobreBotonEstados]);

    const handleMouseEnterBotonEstados = () => {
        setMouseSobreBotonEstados(true);
    };

    const handleMouseLeaveBotonEstados = () => {
        setMouseSobreBotonEstados(false);
    };

    const handleMouseEnterDesplegableEstados = () => {
        setMouseSobreDesplegableEstados(true);
    };

    const handleMouseLeaveDesplegableEstados = () => {
        setMouseSobreDesplegableEstados(false);
    };

    useEffect(() => {
        if (mouseSobreDesplegableUbicaciones || mouseSobreBotonUbicaciones) {
            setUbicacionesDesplegableAbierto(true);
        } else {
            setUbicacionesDesplegableAbierto(false);
        }
    }, [mouseSobreDesplegableUbicaciones, mouseSobreBotonUbicaciones]);

    const handleMouseEnterBotonUbicaciones = () => {
        setMouseSobreBotonUbicaciones(true);
    };

    const handleMouseLeaveBotonUbicaciones = () => {
        setMouseSobreBotonUbicaciones(false);
    };

    const handleMouseEnterDesplegableUbicaciones = () => {
        setMouseSobreDesplegableUbicaciones(true);
    };

    const handleMouseLeaveDesplegableUbicaciones = () => {
        setMouseSobreDesplegableUbicaciones(false);
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
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        obtenerCategorias();
    }, []);

    useEffect(() => {
        const obtenerUbicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ubicaciones');
                setUbicaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las ubicaciones:', error);
            }
        };

        obtenerUbicaciones();
    }, []);

    const deseleccionarCategoria = () => {
        handleIdCategoriaChange(0, '');
    };

    const deseleccionarEstado = () => {
        setEstadoSeleccionado('');
        handleNombreEstado('');
    };

    const deseleccionarUbicacion = () => {
        setUbicacionSeleccionada('');
        handleNombreUbicacion('');
    };

    const estados = [
        { id: 1, nombre: 'Nuevo' },
        { id: 2, nombre: 'Usado' },
        { id: 3, nombre: 'Muy Usado' }
    ];

    const handleClick = () => {
        handleReciente();
        handleActive();
    };

    const handleActive = () => {
        setButtonActive(!butonActive); // Cambia el estado entre true y false
    };

    return (
        <nav className="navbar">
            <div className="nav-buttons">
                <div className="contenedor">
                    <div
                        ref={desplegableRef}
                        className={`desplegable ${estaDesplegableAbierto ? 'abierto' : ''}`}
                        onMouseEnter={handleMouseEnterDesplegable}
                        onMouseLeave={handleMouseLeaveDesplegable}
                    >
                        <button
                            onMouseEnter={handleMouseEnterBoton}
                            onMouseLeave={handleMouseLeaveBoton}
                            className="toggle-desplegable"
                        >
                            {nombreCategoria || <strong>☰ Todas las categorías</strong>}
                            {nombreCategoria && (
                                <span className="deselect-btn" onClick={() => deseleccionarCategoria()}>
                                    ❌
                                </span>
                            )}
                        </button>
                        <ul className="menu-desplegable">
                            {categorias.map((categoria) => (
                                <li key={categoria.ID}>
                                    <a className='desplegableOpcion'
                                        onClick={() => {
                                            handleIdCategoriaChange(categoria.ID, categoria.Nombre);
                                            setEstaDesplegableAbierto(false); // Cierra el desplegable al seleccionar una categoría
                                            navigate('/', { state: { search: categoria.nombre } });
                                        }}
                                    >
                                        {categoria.Nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desplegable de Estados */}
                    <div 
                        ref={estadosDesplegableRef}
                        className={`desplegable ${estadosDesplegableAbierto ? 'abierto' : ''}`}
                        onMouseEnter={handleMouseEnterDesplegableEstados}
                        onMouseLeave={handleMouseLeaveDesplegableEstados}
                    >
                        <button
                            onMouseEnter={handleMouseEnterBotonEstados}
                            onMouseLeave={handleMouseLeaveBotonEstados}
                            className="toggle-desplegable"
                        >
                            {estadoSeleccionado || <strong>☰ Estado del producto</strong>}
                            {estadoSeleccionado && (
                                <span className="deselect-btn" onClick={() => deseleccionarEstado()}>
                                    ❌
                                </span>
                            )}
                        </button>
                        <ul className="menu-desplegable">
                            {estados.map((estado) => (
                                <li key={estado.id}>
                                    <a className='desplegableOpcion'
                                        onClick={() => {
                                            handleNombreEstado(estado.nombre);
                                            setEstadosDesplegableAbierto(false); // Cierra el desplegable al seleccionar un estado
                                            setEstadoSeleccionado(estado.nombre);
                                            navigate('/', { state: { search: estado.nombre } });
                                        }}
                                    >
                                        {estado.nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desplegable de Ubicaciones */}
                    <div
                        ref={ubicacionesDesplegableRef}
                        className={`desplegable ${ubicacionesDesplegableAbierto ? 'abierto' : ''}`}
                        onMouseEnter={handleMouseEnterDesplegableUbicaciones}
                        onMouseLeave={handleMouseLeaveDesplegableUbicaciones}
                    >
                        <button
                            onMouseEnter={handleMouseEnterBotonUbicaciones}
                            onMouseLeave={handleMouseLeaveBotonUbicaciones}
                            className="toggle-desplegable"
                        >
                            {ubicacionSeleccionada || <strong>☰ Todas las ubicaciones</strong>}
                            {ubicacionSeleccionada && (
                                <span className="deselect-btn" onClick={() => deseleccionarUbicacion()}>
                                    ❌
                                </span>
                            )}
                        </button>
                        <ul className="menu-desplegable">
                            {ubicaciones.map((ubicacion) => (
                                <li key={ubicacion.ID}>
                                    <a className='desplegableOpcion'
                                        onClick={() => {
                                            handleNombreUbicacion(ubicacion.ID);
                                            setUbicacionesDesplegableAbierto(false); // Cierra el desplegable al seleccionar una ubicación
                                            setUbicacionSeleccionada(ubicacion.Nombre);
                                            navigate('/', { state: { search: ubicacion.Nombre } });
                                        }}
                                    >
                                        {ubicacion.Nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className={`nav-button ${butonActive ? 'nav-button' : 'button-active'}`} onClick={()=>{
                        handleClick()
                        navigate('/')
                    }}>
                        <strong>Agregados Recientemente</strong>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
