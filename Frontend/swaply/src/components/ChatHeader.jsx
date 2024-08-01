// src/components/ChatHeader.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ChatHeader.css';

const BASE_PRODUCT_IMAGE_URL = 'http://localhost:8000/assets/img/productos/'; // Ruta base para las imágenes de producto

const ChatHeader = ({ chatId }) => {
    const [chatData, setChatData] = useState(null);
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Llamada a la API para obtener los detalles del chat y el producto
        axios.get(`http://localhost:8000/api/mis-chats/${userId}`)
            .then(response => {
                const chat = response.data.find(chat => chat.ID === chatId);
                setChatData(chat || null);
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
                console.log('Producto entregado:', response.data);
            })
            .catch(error => {
                console.error('Error entregando el producto:', error);
            });
        }
    };

    const handleReservarClick = (event) => {
        event.stopPropagation();
        // Lógica para el botón "Reservar"
        console.log('Producto reservado');
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

    return (
        <div className="chat-header" onClick={handleProductClick}>
            <img
                src={getProductImageUrl()}
                alt={chatData?.producto?.Titulo || 'Product'}
                className="chat-header-product-image"
            />
            <h2 className="chat-header-product-title">{chatData?.producto?.Titulo || 'No Title'}</h2>
            <div className="chat-header-buttons">
                <button className="button-entregado" onClick={handleEntregadoClick}>Entregado</button>
                <button className="button-reservar" onClick={handleReservarClick}>Reservar</button>
            </div>
        </div>
    );
};

export default ChatHeader;
