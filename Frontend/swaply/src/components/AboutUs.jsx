import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section id="quienes-somos" className="about-us">
            <div className="about-us-content">
                <h1>Quiénes Somos</h1>
                <p>
                    Swaply nació con la misión de ofrecer una plataforma que facilita la donación de productos que aún tienen una vida útil, conectando a personas que desean deshacerse de artículos no deseados con aquellos que los necesitan.
                </p>
                <p>
                    En Swaply, creemos en la economía circular y en la importancia de reducir el desperdicio. Nuestra iniciativa busca promover la reutilización y la solidaridad, ofreciendo un espacio donde los usuarios pueden donar y recibir productos de manera sencilla y transparente.
                </p>
                <p>
                    Desde su lanzamiento, hemos trabajado para construir una comunidad en la que el intercambio de productos sea tan fácil como hacer clic en un botón. Nos enorgullece ser parte de un cambio positivo hacia un futuro más sostenible.
                </p>
                <div className="about-us-mission">
                    <h2>Nuestra Misión</h2>
                    <p>
                        Fomentar una cultura de donación y reutilización de productos, reduciendo así el impacto ambiental y promoviendo el bienestar social.
                    </p>
                </div>
                <div className="about-us-values">
                    <h2>Nuestros Valores</h2>
                    <ul>
                        <li><strong>Solidaridad:</strong> Promovemos el apoyo mutuo entre miembros de la comunidad.</li>
                        <li><strong>Sostenibilidad:</strong> Buscamos reducir el desperdicio y contribuir a la protección del medio ambiente.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
