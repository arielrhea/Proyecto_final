import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { useAuth } from '../context/AuthContext';
import Notification from './Notification';

const BASE_PRODUCT_IMAGE_URL = 'http://localhost:8000/assets/img/productos/';
const BASE_USER_IMAGE_URL = 'http://localhost:8000/assets/img/usuarios/';

const ProductDetail = ({ product }) => {
    const [expandedImageIndex, setExpandedImageIndex] = useState(0);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { userId, isAuthenticated, token } = useAuth();

    const isReserved = product?.ProductoReservado === 1;
    const hasMultipleImages = images.length > 1;

    const [notification, setNotification]=useState('');
    useEffect(() => {
        if (product?.Imagenes) {
            try {
                const imagesArray = JSON.parse(product.Imagenes);
                if (Array.isArray(imagesArray) && imagesArray.length > 0) {
                    const formattedImages = imagesArray.map(img => `${BASE_PRODUCT_IMAGE_URL}${img}`);
                    setImages(formattedImages);
                }
            } catch (error) {
                console.error('Error al parsear la cadena JSON de imágenes:', error);
            }
        }
    }, [product?.Imagenes]);

    useEffect(() => {
        const calculateTimeAgo = (dateString) => {
            const fecha = new Date(dateString);
            const ahora = new Date();
            const diferencia = ahora - fecha;

            const minutos = Math.floor(diferencia / 1000 / 60);
            const horas = Math.floor(minutos / 60);
            const dias = Math.floor(horas / 24);
            const semanas = Math.floor(dias / 7);

            if (minutos < 60) {
                return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
            } else if (horas < 24) {
                return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
            } else if (dias < 7) {
                return `hace ${dias} día${dias > 1 ? 's' : ''}`;
            } else {
                return `hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
            }
        };

        if (product?.FechaPublicacion) {
            setFormattedDate(calculateTimeAgo(product.FechaPublicacion));
        }
    }, [product?.FechaPublicacion]);

    const handleImageClick = (index) => {
        setExpandedImageIndex(index);
        setIsImageExpanded(true);
    };

    const closeExpandedImage = () => {
        setIsImageExpanded(false);
    };

    const handlePreviousImage = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === (images.length || 1) - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousMainImage = (e) => {
        e.stopPropagation();
        setExpandedImageIndex((prevIndex) =>
            prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
        );
    };

    const handleNextMainImage = (e) => {
        e.stopPropagation();
        setExpandedImageIndex((prevIndex) =>
            prevIndex === (images.length || 1) - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousImageInExpandedView = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === 0 ? (images.length || 1) - 1 : prevIndex - 1
        );
    };

    const handleNextImageInExpandedView = () => {
        setExpandedImageIndex((prevIndex) =>
            prevIndex === (images.length || 1) - 1 ? 0 : prevIndex + 1
        );
    };

    const handleProfileClick = () => {
        navigate(`/profile/${product?.usuario?.ID}`);
    };

    const handleReturn = () => {
        navigate(-1);
    };

    const isOwner = (producto) => {
        return producto?.UsuarioID == userId;
    };

    // Función para eliminar un producto
    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/producto/${product.ID}`, {
                headers: { token }
            });
           setNotification(`${product.Titulo} se ha eliminado con éxito`)
           setTimeout(() => {
            setNotification('')
            navigate(`/profile/${userId}`)
           }, 2500);
        } catch (error) {
            setNotification('Ha habido un problema al eliminar el producto')
            setTimeout(() => {
             setNotification('')
            }, 5000);
        }
    };

    // Función para crear un chat y navegar a la página de chats
    const handleCreateChat = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/chats', {
                'solicitante': userId,
                'producto': product.ID
            });
            const newChatId = response.data.ID;
            console.log('New Chat ID:', newChatId); // Agregar esta línea
            alert('Chat creado con éxito.');
            navigate('/chats', { state: { chatId: newChatId } });
        } catch (error) {
            console.error('Error al crear el chat:', error);
            alert('Error al crear el chat.');
        }
    };

    return (
        <div className="product-detail-wrapper">
               <Notification message={notification} onClose={() => setNotification('')} />

            {isReserved && <div className="reserved-tag">Reservado</div>}
            <div className='buttonsFlex'>
                <button className='returnButton' onClick={handleReturn}>Volver atrás</button>
                {isAuthenticated && isOwner(product) ? (
                    <div>
                        <button className='returnButton' onClick={() => navigate(`/mto/${product.ID}`)}>Modificar Producto</button>
                        <button className='deleteButton' onClick={handleDeleteProduct}>Eliminar Producto</button>
                    </div>
                ) : (
                    <button className='pedirButton' onClick={handleCreateChat}>Pedir Producto</button>
                )}
            </div>
            <h1 className="product-detail-title">{product?.Titulo}</h1>

            <div className={`product-detail-images ${hasMultipleImages ? 'more-than-one-image' : ''}`}>
                {images.length > 0 && (
                    <div
                        className={`product-detail-image-container ${hasMultipleImages ? 'more-than-one-image' : ''}`}
                        onClick={() => handleImageClick(0)}
                        onMouseEnter={() => setIsHoveringImage(true)}
                        onMouseLeave={() => setIsHoveringImage(false)}
                    >
                        {hasMultipleImages && (
                            <>
                                <button className="main-image-prev-button" onClick={handlePreviousMainImage}>‹</button>
                                <button className="main-image-next-button" onClick={handleNextMainImage}>›</button>
                            </>
                        )}
                        <img
                            src={images[expandedImageIndex] || images[0]}
                            alt="Imagen principal"
                            className="product-detail-image"
                        />
                        {isHoveringImage && hasMultipleImages && (
                            <div className="image-indicators">
                                {images.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`indicator ${index === expandedImageIndex ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isImageExpanded && (
                <div className={`product-detail-expanded-overlay ${hasMultipleImages ? 'more-than-one-image' : ''}`} onClick={closeExpandedImage}>
                    <button className="expanded-close-button" onClick={closeExpandedImage}>✕</button>
                    {hasMultipleImages && (
                        <>
                            <button className="expanded-prev-button" onClick={(e) => { e.stopPropagation(); handlePreviousImageInExpandedView(); }}>‹</button>
                            <button className="expanded-next-button" onClick={(e) => { e.stopPropagation(); handleNextImageInExpandedView(); }}>›</button>
                        </>
                    )}
                    <img
                        src={images[expandedImageIndex] || ''}
                        alt={`Imagen expandida ${expandedImageIndex + 1}`}
                        className="product-detail-expanded-image"
                    />
                    {hasMultipleImages && (
                        <div className="expanded-carousel">
                            <div className="expanded-carousel-images">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`expanded-carousel-image ${index === expandedImageIndex ? 'active' : ''}`}
                                        onClick={(e) => e.stopPropagation()} // Evita cerrar el carousel al hacer clic en miniaturas
                                    >
                                        <img
                                            src={img}
                                            alt={`Miniatura ${index + 1}`}
                                            onClick={() => setExpandedImageIndex(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="product-detail-info">
                <h2>Descripción del Producto</h2>
                <p className="product-detail-description">{product?.Descripcion}</p>
                <div className="product-additional-info">
                    <p><strong>Categoría:</strong> {product?.categoria?.Nombre}</p>
                    <p><strong>Estado del Producto:</strong> {product?.EstadoProducto}</p>
                    <p><strong>Fecha de Publicación:</strong> <span>{formattedDate}</span></p>
                </div>
            </div>

            <div className="product-detail-user-info">
                <h2>Publicado por:</h2>
                <div
                    className="product-detail-user-profile"
                    onClick={handleProfileClick}
                >
                    <img
                        src={product?.usuario?.FotoPerfil ? `${BASE_USER_IMAGE_URL}${product.usuario.FotoPerfil}` : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"}
                        alt={product?.usuario?.NombreUsuario || 'Usuario'}
                        className="product-detail-user-profile-image"
                    />
                    <div className="product-detail-user-details">
                        <p className="product-detail-user-name">{product?.usuario?.NombreUsuario || 'Nombre no disponible'}</p>
                        <p className="product-detail-user-city">{product?.usuario?.ubicacion?.Nombre || 'Ubicación no disponible'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
