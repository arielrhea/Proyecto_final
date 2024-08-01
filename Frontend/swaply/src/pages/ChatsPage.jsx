// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext'; // Importa el contexto
import './ChatsPage.css';
import Chat from '../components/Chat';
import ChatHeader from '../components/ChatHeader';

const BASE_USER_IMAGE_URL = 'http://localhost:8000/assets/img/usuarios/';

const ChatPage = () => {
    const [selectedChatId, setSelectedChatId] = useState(null);
    const { userId } = useAuth();
    const location = useLocation();
    const { chats, setChats } = useChat(); // Obtén los chats y la función para actualizarlos
    
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8000/api/mis-chats/${userId}`)
                .then(response => {
                    const updatedChats = response.data.map(chat => {
                        const lastMessage = chat.mensaje.length > 0 ? chat.mensaje[chat.mensaje.length - 1].Contenido : 'No hay mensajes todavia';
                        return { ...chat, lastMessage };
                    });
                    setChats(updatedChats);
                    const chatId = location.state?.chatId;
                    console.log('Chat ID:', chatId);
                    if (chatId) {
                        setSelectedChatId(chatId);
                    }
                })
                .catch(error => {
                    console.error('Error fetching chats:', error);
                });
        }
    }, [userId, location, setChats]);

    return (
        <div className="chat-page">
            <div className="chat-list">
                <div className='titulo-chats'>
                <h2>Tus Chats</h2>
                </div>
                <ul>
                    {chats.map(chat => (
                        <li key={chat.ID} onClick={() => setSelectedChatId(chat.ID)}>
                            <span className='usuario-chat'>
                                <img 
                                    src={`${BASE_USER_IMAGE_URL}${chat.usuario1.ID == userId ? chat.usuario2.FotoPerfil : chat.usuario1.FotoPerfil}`} 
                                    alt="User profile" 
                                    className="profile-img"
                                />
                                {chat.usuario1.ID == userId ? chat.usuario2.NombreUsuario : chat.usuario1.NombreUsuario}
                            </span>
                            <span className='producto-info'>{chat.producto.Titulo}</span>
                            <span className='last-message'>{chat.lastMessage}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='espacio-para-el-header'>
            
            </div>
            <div className="chat-detail">
            
                {selectedChatId ? <Chat chatId={selectedChatId} /> : <p className='selecciona'>Selecciona un chat para visualizar los mensajes</p>}
            </div>
        </div>
    );
};

export default ChatPage;

