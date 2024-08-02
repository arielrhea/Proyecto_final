// src/components/ChatHeader.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ChatHeader.css';

const BASE_PRODUCT_IMAGE_URL = 'http://localhost:8000/assets/img/productos/'; // Ruta base para las imágenes de producto

const ChatHeader = ({ chatId }) => {
    const [chatData, setChatData] = useState(null);
    const [isReserved, setIsReserved] = useState(false); // Estado para verificar si el producto está reservado
    const [isDelivered, setIsDelivered] = useState(false); // Estado para verificar si el producto ha sido entregado
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/mis-chats/${userId}`)
            .then(response => {
                const chat = response.data.find(chat => chat.ID === chatId);
                setChatData(chat || null);
                if (chat?.producto?.ProductoReservado === 'Reservado') {
                    setIsReserved(true);
                }
                if (chat?.producto?.Entregado) {
                    setIsDelivered(true);
                }
            })
            .catch(error => {
                console.error('Error fetching chat details:', error);
            });
    }, [chatId, userId]);

    const handleProductClick = () => {
        if (chatData?.producto?.ID) {
            navigate(`/product/${chatData.producto.ID}`);
        }
    };

    const handleEntregadoClick = (event) => {
        event.stopPropagation();
        if (chatData) {
            axios.post('http://localhost:8000/api/intercambios', {
                "usuario1": chatData.Usuario1_ID,
                "usuario2": chatData.Usuario2_ID,
                "producto": chatData.producto.ID
            })
            .then(response => {
                setIsDelivered(true);
                console.log('Producto entregado:', response.data);
            })
            .catch(error => {
                console.error('Error entregando el producto:', error);
            });
        }
    };

    const handleReservarClick = (event) => {
        event.stopPropagation();
        const endpoint = isReserved
            ? `http://localhost:8000/api/producto/${chatData.producto.ID}/reservar`
            : `http://localhost:8000/api/producto/${chatData.producto.ID}/reservar`;

        axios.post(endpoint)
            .then(response => {
                setIsReserved(!isReserved);
                console.log(isReserved ? 'Reserva cancelada' : 'Producto reservado:', response.data);
            })
            .catch(error => {
                console.error(isReserved ? 'Error cancelando la reserva' : 'Error reservando el producto:', error);
            });
    };

    const getProductImageUrl = () => {
        if (chatData?.producto?.Imagenes) {
            try {
                const imagesArray = JSON.parse(chatData.producto.Imagenes);
                if (Array.isArray(imagesArray) && imagesArray.length > 0) {
                    return `${BASE_PRODUCT_IMAGE_URL}${imagesArray[0]}`;
                }
            } catch (error) {
                console.error('Error al parsear la cadena JSON de imágenes:', error);
            }
        }
        return 'https://via.placeholder.com/100';
    };

    const showButtons = userId == chatData?.Usuario2_ID && !isDelivered;

    return (
        <div className="chat-header">
            <img
                src={getProductImageUrl()}
                alt={chatData?.producto?.Titulo || 'Product'}
                className="chat-header-product-image"
                onClick={handleProductClick}
            />
            <div className="chat-header-product-info">
                <h2 className="chat-header-product-title">{chatData?.producto?.Titulo || 'No Title'}</h2>
            </div>
            {showButtons && (
                <div className="chat-header-buttons">
                    <button
                        className={`button-entregado ${isDelivered ? 'button-disabled' : ''}`}
                        onClick={handleEntregadoClick}
                        disabled={isDelivered}
                    >
                        {isDelivered ? 'Entregado' : 'Entregar'}
                    </button>
                    {!isDelivered && (
                        <button className="button-reservar" onClick={handleReservarClick}>
                            {isReserved ? 'Cancelar Reserva' : 'Reservar'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatHeader;
