import React, { useState } from 'react';
import './ProductDetail.css';

const mockImages = [
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841',
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841',
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841',
    'https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg?20090511140841'
];

const ProductDetail = ({ product }) => {
    const [expandedImageIndex, setExpandedImageIndex] = useState(0);
    const [isImageExpanded, setIsImageExpanded] = useState(false);

    const handleImageClick = (index) => {
        setExpandedImageIndex(index);
        setIsImageExpanded(true);
    };

    const closeExpandedImage = () => {
        setIsImageExpanded(false);
    };

    const handlePreviousImage = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === 0 ? mockImages.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === mockImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="product-detail-wrapper">
            {product.isReserved && <div className="reserved-tag">Reservado</div>}
            <h1 className="product-detail-title">{product.Titulo}</h1>
            
            <div className="product-detail-images">
                {mockImages.map((img, index) => (
                    <div
                        key={index}
                        className="product-detail-image-container"
                        onClick={() => handleImageClick(index)}
                    >
                        <img src={img} alt={`Imagen ${index + 1}`} className="product-detail-image" />
                    </div>
                ))}
            </div>

            {isImageExpanded && (
                <div className="product-detail-expanded-overlay" onClick={closeExpandedImage}>
                    <button className="expanded-close-button" onClick={closeExpandedImage}>✕</button>
                    <button className="expanded-prev-button" onClick={(e) => { e.stopPropagation(); handlePreviousImage(); }}>‹</button>
                    <img
                        src={mockImages[expandedImageIndex]}
                        alt={`Imagen expandida ${expandedImageIndex + 1}`}
                        className="product-detail-expanded-image"
                    />
                    <button className="expanded-next-button" onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>›</button>
                </div>
            )}

            <div className="product-detail-info">
                <h2>Descripción del Producto</h2>
                <p className="product-detail-description">{product.Descripcion}</p>
                <div className="product-additional-info">
                    <p><strong>Categoría:</strong> {product.categoria.Nombre}</p>
                    <p><strong>Estado del Producto:</strong> {product.EstadoProducto}</p>
                    <p><strong>Fecha de Publicación:</strong> {product.FechaPublicacion}</p>
                </div>
            </div>

            <div className="product-detail-user-info">
                <h2>Publicado por:</h2>
                <div className="product-detail-user-profile">
                    <img
                        src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                        alt={product.usuario.NombreUsuario}
                        className="product-detail-user-profile-image"
                    />
                    <div className="product-detail-user-details">
                        <p className="product-detail-user-name">{product.usuario.NombreUsuario}</p>
                        <p className="product-detail-user-city">{product.usuario.Ciudad}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
