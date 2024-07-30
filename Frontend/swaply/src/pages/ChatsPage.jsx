import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ChatsPage.css';
import Chat from '../components/Chat';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const { userId } = useAuth();
    const location = useLocation();
    
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8000/api/mis-chats/${userId}`)
                .then(response => {
                    setChats(response.data);
                    const chatId = location.state?.chatId;
                    console.log('Chat ID:', chatId); // Agregar esta línea para verificar el valor
                    if (chatId) {
                        setSelectedChatId(chatId);
                    }
                })
                .catch(error => {
                    console.error('Error fetching chats:', error);
                });
        }
    }, [userId, location]);

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
