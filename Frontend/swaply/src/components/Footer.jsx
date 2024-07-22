import React from 'react';
import './Footer.css'; // Asegúrate de crear este archivo para los estilos

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Sobre Nosotros</h4>
                    <ul>
                        <li><a href="#quienes-somos">Quiénes Somos</a></li>
                        <li><a href="#como-funciona">Cómo Funciona</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Centro de Ayuda</h4>
                    <ul>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-media">
                        <a href="#" className="social-icon">Facebook</a>
                        <a href="#" className="social-icon">Twitter</a>
                        <a href="#" className="social-icon">Instagram</a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Información Legal</h4>
                    <ul>
                        <li><a href="#terminos">Términos y Condiciones</a></li>
                        <li><a href="#privacidad">Política de Privacidad</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Swaply. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
