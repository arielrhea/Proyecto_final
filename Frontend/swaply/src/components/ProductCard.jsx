import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { Imagen, Titulo, EstadoProducto, ProductoReservado } = product;

    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Verificar si ProductoReservado es 1
    const isReserved = ProductoReservado === 1;

    return (
        <div className="product-card">
            {isReserved && <div className="reserved-tag">Reservado</div>}
            <img 
                src={Imagen || "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841"} 
                alt={Titulo} 
                className="product-image" 
            />
            <div className="product-info">
                <h3 className="product-title">{Titulo}</h3>
                <p className="product-status">{capitalizeFirstLetter(EstadoProducto)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
