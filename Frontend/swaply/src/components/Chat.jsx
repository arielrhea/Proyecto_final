// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import './Chat.css';

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { userId } = useAuth(); // Obtener userId del contexto

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER
        });

        const channel = pusher.subscribe(`chat-${chatId}`);

        channel.bind('message', (data) => {
            setMessages(prevMessages => [...prevMessages, data.message]);
        });

        // Fetch existing messages
        axios.get(`http://localhost:8000/api/chats/${chatId}/mensajes`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

        // Cleanup on component unmount
        return () => {
            pusher.unsubscribe(`chat-${chatId}`);
        };
    }, [chatId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            axios.post(`http://localhost:8000/api/chats/${chatId}/mensajes`, {
                usuario: userId,  // Incluye userId en el payload
                contenido: newMessage
            })
            .then(response => {
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat">
            <div className="message-list">
                {/* crear componente de producto en chat */}
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.UsuarioID === userId ? 'received' : 'sent'}`}
                    >
                        {msg.Contenido}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message" 
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
