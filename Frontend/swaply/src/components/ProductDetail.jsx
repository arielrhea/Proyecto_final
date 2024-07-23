import React, { useState } from 'react';
import './ProductDetail.css';

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
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Asegurarse de que imágenes no sea null y dividirlas si existen
    const images = product.Imagenes ? product.Imagenes.split(',') : [];

    return (
        <div className="product-detail">
            <h1 className="product-detail-title">{product.Titulo}</h1>
            <p className="product-detail-description">{product.Descripcion}</p>
            
            <div className="product-detail-images">
                {images.map((img, index) => (
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
                        src={images[expandedImageIndex]}
                        alt={`Imagen expandida ${expandedImageIndex + 1}`}
                        className="product-detail-expanded-image"
                    />
                    <button className="expanded-next-button" onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>›</button>
                </div>
            )}

            <div className="product-detail-user-info">
                <h2>Publicado por:</h2>
                <div className="product-detail-user-profile">
                    <img
                        src={product.usuario.FotoPerfil}
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
