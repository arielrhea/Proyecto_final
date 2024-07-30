import React, { useState, useEffect } from 'react';
import axios from 'axios';
import echo from '../echo.js'; // Importa tu configuración de Laravel Echo
import './Chat.css';
import { useAuth } from '../context/AuthContext';

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { userId } = useAuth(); // Obtener userId del contexto

    useEffect(() => {
        // Suscríbete al canal de chat
        const channel = echo.channel(`chat.${chatId}`);

        // Escucha el evento de mensaje enviado
        channel.listen('.message.sent', (event) => {
            setMessages(prevMessages => [...prevMessages, event.message]);
        });
        

        // Fetch existing messages
        axios.get(`http://localhost:8000/api/chats/${chatId}/mensajes`)
            .then(response => {
                console.log('Mensajes iniciales:', response.data);
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

        // Cleanup on component unmount
        return () => {
            channel.stopListening('.message.sent');
        };
    }, [chatId]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            axios.post(`http://localhost:8000/api/chats/${chatId}/mensajes`, {
                usuario: userId,
                contenido: newMessage
            })
            .then(response => {
                console.log('Mensaje enviado:', response.data);
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
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.usuario === userId ? 'received' : 'sent'}`}
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
