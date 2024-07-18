import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import './Navbar.css'; // Importar los estilos CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    // Estado para controlar la visibilidad del menú hamburguesa
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Datos de categorías (mockup estático)
    const categorias = [
        { id: 1, nombre: 'Electrónicos', ruta: '/categorias/electronicos' },
        { id: 2, nombre: 'Ropa', ruta: '/categorias/ropa' },
        { id: 3, nombre: 'Libros', ruta: '/categorias/libros' },
        { id: 4, nombre: 'Muebles', ruta: '/categorias/muebles' },
        { id: 5, nombre: 'Juguetes', ruta: '/categorias/juguetes' },
        { id: 6, nombre: 'Decoración', ruta: '/categorias/decoracion' }
    ];

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <nav className="navbar">
            {/* Icono del menú hamburguesa */}
            <div className="navbar-toggle" onClick={toggleMenu}>
                <i className="fa fa-bars"></i> Todas las categorías
            </div>
            {/* Menú hamburguesa */}
            <ul className={`navbar-menu ${menuAbierto ? 'activo' : ''}`}>
                {categorias.map(categoria => (
                    <li key={categoria.id}>
                        {/* Comentado para cargar dinámicamente desde el servidor */}
                        {/* <Link to={categoria.ruta}>{categoria.nombre}</Link> */}
                        {categoria.nombre}
                    </li>
                ))}
            </ul>
            {/* Elemento independiente "Agregado Recientemente" */}
            <div className="navbar-agregado-recientemente">
                {/* Comentado para cargar dinámicamente desde el servidor */}
                {/* <Link to="/agregado-recientemente">Agregado Recientemente</Link> */}
                Agregado Recientemente
            </div>
            {/* Elementos adicionales en la barra de navegación */}
            <ul className="navbar-menu-adicionales">
                <li>
                    {/* Comentado para cargar dinámicamente desde el servidor */}
                    {/* <Link to="/donaciones-populares">Donaciones Populares</Link> */}
                    Donaciones Populares
                </li>
                <li>
                    {/* Comentado para cargar dinámicamente desde el servidor */}
                    {/* <Link to="/articulos-solicitados">Artículos más Solicitados</Link> */}
                    Artículos más Solicitados
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
