// src/components/Presentacion.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Presentacion.css';

const images = [
    'https://aulas2030.net/wp-content/uploads/2021/02/S_SDG_inverted_WEB-11.png',
    'https://aulas2030.net/wp-content/uploads/2021/02/S_SDG_inverted_WEB-12.png'
];

const Presentacion = () => {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState('welcome');

    const handleSectionChange = (section) => {
        setCurrentSection(section);
    };

    const handleGetStartedClick = () => {
        navigate('/login'); // Cambia '/login' a la ruta a la que quieras redirigir
    };

    return (
        <div className="presentacion-container">
            <div className="presentacion-content">
                {currentSection === 'welcome' && (
                    <div className="presentacion-text">
                        <h1 className="presentacion-title">¡Bienvenidos a Swaply!</h1>
                        <p className="presentacion-description">
                            Swaply es una innovadora aplicación web creada por Adrià, Naim y Aren.
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('problema')}>
                            Problema con Datos
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('propuesta')}>
                            Propuesta de Solución
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('ods')}>
                            ODS
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('herramientas')}>
                            Herramientas Técnicas
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('equipo')}>
                            Equipo y Roles
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('demo')}>
                            Demo
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('futuro')}>
                            Futuro
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('agradecimientos')}>
                            Agradecimientos
                        </button>
                    </div>
                )}

                {currentSection === 'problema' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Problema con Datos</h2>
                        <p className="section-description">
                            Swaply nace con la idea de conectar quienes desean donar artículos de segunda mano con quienes lo necesitan.
                            Según el Instituto Nacional de Estadísticas, cada año se desechan 24 millones de toneladas de residuos urbanos,
                            entre los cuales hay muchos artículos en buenas condiciones que acaban en un vertedero.
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('welcome')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('propuesta')}>
                            Propuesta de Solución
                        </button>
                    </div>
                )}

                {currentSection === 'propuesta' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Propuesta de Solución</h2>
                        <p className="section-description">
                            La propuesta es crear una red de personas que se puedan conectar a través de la plataforma para promover la
                            sostenibilidad en las comunidades, así como el consumo responsable.
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('problema')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('ods')}>
                            ODS
                        </button>
                    </div>
                )}

                {currentSection === 'ods' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">ODS</h2>
                        <div className="ods-container">
                            <img src={images[0]} alt="ODS 11" className="ods-image" />
                            <img src={images[1]} alt="ODS 12" className="ods-image" />
                        </div>
                        <button className="section-button" onClick={() => handleSectionChange('propuesta')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('herramientas')}>
                            Herramientas Técnicas
                        </button>
                    </div>
                )}

                {currentSection === 'herramientas' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Herramientas Técnicas</h2>
                        <div className="tools-container">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp1qb4_f1sKSsZOYyCaqbY3ST6D-Pdi66wMA&s" alt="Trello" className="tool-image" />
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png" alt="React" className="tool-image" />
                            <img src="https://miro.medium.com/v2/resize:fit:1400/1*CmBkKFujQyxwdvSkSKzUrg.png" alt="Miro" className="tool-image" />
                            <img src="https://static.vecteezy.com/system/resources/previews/011/260/238/non_2x/html5-css3-js-icon-set-web-development-logo-icon-set-of-html-css-and-javascript-programming-symbol-free-vector.jpg" alt="CSS" className="tool-image" />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZYFi82dCf8BjsFqYeB6LC86rbrpWE9s9OZA&s" alt="GitHub" className="tool-image" />
                        </div>
                        <button className="section-button" onClick={() => handleSectionChange('ods')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('equipo')}>
                            Equipo y Roles
                        </button>
                    </div>
                )}

                {currentSection === 'equipo' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Equipo y Roles</h2>
                        <pre className="team-roles">
                            {`
            <Roles>

                <Backend>
                        Naim
                </Backend> 

                <Frontend>            
                        Adrià 
                        Aren
                </Frontend>

                <Base de datos>
                         Naim
                         Adrià
                         Aren
                </Base de datos>

            </Roles>
            `}
                        </pre>
                        <button className="section-button" onClick={() => handleSectionChange('herramientas')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('demo')}>
                            Demo
                        </button>
                    </div>
                )}

                {currentSection === 'demo' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Demo</h2>
                        <p className="section-description">
                            <span className="highlight">¡Explora nuestra demo!</span>
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('equipo')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={handleGetStartedClick}>
                            Iniciar Sesión
                        </button>
                    </div>
                )}

                {currentSection === 'futuro' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Futuro</h2>
                        <p className="section-description">
                            En el futuro, nos encantaría implementar un mapa con geolocalización estimada para cada usuario, facilitando la busqueda por proximidad.
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('demo')}>
                            Volver
                        </button>
                        <button className="section-button" onClick={() => handleSectionChange('agradecimientos')}>
                            Agradecimientos
                        </button>
                    </div>
                )}

                {currentSection === 'agradecimientos' && (
                    <div className="presentacion-text">
                        <h2 className="section-title">Agradecimientos</h2>
                        <p className="section-description">
                            Queremos agradecer a todos los que han apoyado y colaborado en este proyecto.
                        </p>
                        <button className="section-button" onClick={() => handleSectionChange('welcome')}>
                            Volver
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Presentacion;
