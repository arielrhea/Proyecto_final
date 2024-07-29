// src/components/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import './ChatsPage.css';
import Chat from '../components/Chat';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const { userId } = useAuth(); // Obtener userId del contexto

    useEffect(() => {
        if (userId) {
            // Fetch the user's chats
            axios.get(`http://localhost:8000/api/mis-chats/${userId}`)
                .then(response => {
                    setChats(response.data);
                })
                .catch(error => {
                    console.error('Error fetching chats:', error);
                });
        }
    }, [userId]); // Dependencia de userId para ejecutar el efecto solo cuando userId esté disponible

    return (
        <div className="chat-page">
            <div className="chat-list">
                <h2>Your Chats</h2>
                <ul>
                    {chats.map(chat => (
                        <li key={chat.ID} onClick={() => setSelectedChatId(chat.ID)}>
                            Chat with User {chat.Usuario2_ID} about Product {chat.ProductoID}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-detail">
                {selectedChatId ? <Chat chatId={selectedChatId} /> : <p>Select a chat to view messages.</p>}
            </div>
        </div>
    );
};

export default ChatPage;
