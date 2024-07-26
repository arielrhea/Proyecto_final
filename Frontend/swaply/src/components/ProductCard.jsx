import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { Imagenes, Titulo, EstadoProducto, ProductoReservado, ID } = product;
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
        if (ID) {
            navigate(`/product/${ID}`);
        } else {
            console.error("El id del producto no está definido");
        }
    };

    // Manejo de la imagen
    let imageSrc = "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841"; // Imagen de mockup por defecto

    // Parsear la cadena JSON de imágenes
    try {
        const imagesArray = JSON.parse(Imagenes);
        if (Array.isArray(imagesArray) && imagesArray.length > 0) {
            imageSrc = `http://localhost:8000/assets/img/productos/${imagesArray[0]}`;
        }
    } catch (error) {
        console.error('Error al parsear la cadena JSON de imágenes:', error);
    }

    return (
        <div className="product-card" onClick={handleClick}>
            {isReserved && <div className="reserved-tag-product">Reservado</div>}
            <img 
                src={imageSrc} 
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
