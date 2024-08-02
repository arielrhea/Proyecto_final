import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Sobre Nosotros</h4>
                    <ul>
                        <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
                        <li><Link to="/como-funciona">Cómo Funciona</Link></li>
                        <li><Link to="/presentacion">Presentacion</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Centro de Ayuda</h4>
                    <ul>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
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
                        <li><Link to="/terminos">Términos y Condiciones</Link></li>
                        <li><Link to="/privacidad">Política de Privacidad</Link></li>
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
