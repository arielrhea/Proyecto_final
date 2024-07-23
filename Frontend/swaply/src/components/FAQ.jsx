import React from 'react';
import './FAQ.css';

const FAQ = () => {
    return (
        <section id="faq" className="faq">
            <div className="faq-content">
                <h1>Preguntas Frecuentes</h1>
                <div className="faq-item">
                    <h2>¿Cómo puedo donar un producto?</h2>
                    <p>Para donar un producto, inicia sesión en tu cuenta, haz clic en "Publicar Producto", sube una foto, escribe una descripción y selecciona la categoría adecuada.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Cómo encuentro productos para recibir?</h2>
                    <p>Utiliza la barra de búsqueda o explora las categorías para encontrar productos que te interesen. Puedes contactar al donante a través del chat.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Qué hago si el producto que quiero ya está reservado?</h2>
                    <p>Si un producto está reservado, se mostrará como "Reservado" en la plataforma. Puedes buscar otros productos disponibles.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Cómo confirmo la recepción de un producto?</h2>
                    <p>Después de recibir el producto, accede a tu perfil y confirma la recepción para actualizar tu historial de donaciones.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Puedo contactar al donante directamente?</h2>
                    <p>Sí, puedes enviar un mensaje al donante a través del sistema de chat en la plataforma para coordinar detalles.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Qué hago si el producto que recibí está dañado?</h2>
                    <p>Contacta al soporte de Swaply a través del sistema de mensajes para reportar cualquier problema con el producto recibido.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Cómo elimino un producto de mi perfil?</h2>
                    <p>Puedes eliminar un producto desde tu perfil en la sección "Mis Productos". Simplemente selecciona el producto y elige la opción de eliminar.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Es necesario registrarse para usar Swaply?</h2>
                    <p>Sí, debes crear una cuenta para poder publicar productos, recibir donaciones y utilizar todas las funciones de la plataforma.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Cómo puedo cambiar mi información de contacto?</h2>
                    <p>Accede a la sección "Mi Perfil" para actualizar tu información de contacto y otros detalles de tu cuenta.</p>
                </div>
                <div className="faq-item">
                    <h2>¿Swaply tiene algún costo?</h2>
                    <p>No, el uso de Swaply para donar o recibir productos es completamente gratuito.</p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
