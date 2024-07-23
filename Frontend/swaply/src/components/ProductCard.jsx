import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { Imagen, Titulo, EstadoProducto, ProductoReservado, ID } = product;
    const navigate = useNavigate();

    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    // Verificar si ProductoReservado es 1
    const isReserved = ProductoReservado === 1;

    // Función para manejar el clic en la tarjeta
    const handleClick = () => {
        console.log("Product ID:", ID); // Verifica que id esté definido
        if (ID) {
            navigate(`/product/${ID}`);
        } else {
            console.error("El id del producto no está definido");
        }
    };

    return (
        <div className="product-card" onClick={handleClick}>
            {isReserved && <div className="reserved-tag-product">Reservado</div>}
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
