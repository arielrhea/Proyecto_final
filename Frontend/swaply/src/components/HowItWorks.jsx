import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section id="como-funciona" className="how-it-works">
            <div className="how-it-works-content">
                <h1>Cómo Funciona</h1>
                <p>
                    En Swaply, hemos simplificado el proceso de donación y recepción de productos en unos pocos pasos sencillos:
                </p>
                <div className="step">
                    <h2>Paso 1: Publicar un Producto</h2>
                    <p>Sube una foto del producto que deseas donar, agrega una descripción detallada y marca la categoría adecuada. Tu producto estará disponible para otros usuarios en la plataforma.</p>
                </div>
                <div className="step">
                    <h2>Paso 2: Buscar Productos</h2>
                    <p>Explora los productos disponibles en la plataforma. Puedes buscar por categoría, ubicación o utilizar la barra de búsqueda para encontrar artículos específicos.</p>
                </div>
                <div className="step">
                    <h2>Paso 3: Solicitar un Producto</h2>
                    <p>Cuando encuentres un producto que te interesa, envía una solicitud al donante. Puedes comunicarte directamente con el donante a través de nuestro sistema de mensajería.</p>
                </div>
                <div className="step">
                    <h2>Paso 4: Confirmar la Donación</h2>
                    <p>El donante revisará tu solicitud y decidirá a quién entregar el producto. Una vez que se confirme, podrás coordinar la entrega del producto.</p>
                </div>
                <div className="step">
                    <h2>Paso 5: Confirmar Recepción</h2>
                    <p>Después de recibir el producto, confirma la recepción en la plataforma. Tu perfil se actualizará para mostrar los productos que has recibido.</p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
