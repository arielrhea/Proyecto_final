import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contacto" className="contact">
            <div className="contact-content">
                <h1>Contacto</h1>
                <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.</p>
                <div className="contact-info">
                    <h2>Información de Contacto</h2>
                    <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
                    <p><strong>Email:</strong> contacto@swaply.com</p>
                    <p><strong>Dirección:</strong> 1234 Calle Ficticia, Ciudad Imaginaria, 56789</p>
                </div>
                <div className="contact-form">
                    <h2>Formulario de Contacto</h2>
                    <form>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="message">Mensaje:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
