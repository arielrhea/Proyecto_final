// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import echo from '../echo.js';
import { useChat } from '../context/ChatContext';
import './Chat.css';
import { useAuth } from '../context/AuthContext';
import ChatHeader from './ChatHeader.jsx';

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { userId } = useAuth();
    const { updateChat } = useChat();

    useEffect(() => {
        const channel = echo.channel(`chat.${chatId}`);

        channel.listen('.message.sent', (event) => {
            setMessages(prevMessages => [...prevMessages, event.message]);
            updateChat(chatId, event.message.Contenido);
        });

        axios.get(`http://localhost:8000/api/chats/${chatId}/mensajes`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

        return () => {
            channel.stopListening('.message.sent');
        };
    }, [chatId, updateChat]);

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

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            axios.post(`http://localhost:8000/api/chats/${chatId}/mensajes`, {
                usuario: userId,
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
        <div className="messaging">
            <ChatHeader chatId={chatId} />
            <div className="msg_history">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.UsuarioID == userId ? 'outgoing_msg' : 'incoming_msg'}`}
                    >
                        {msg.UsuarioID == userId ? (
                            <div className="sent_msg">
                                <div className="sent_msg_content">
                                    <p>{msg.Contenido}</p>
                                </div>
                                <span className="time_date sent_time">{calculateTimeAgo(msg.Fecha)}</span>
                            </div>
                        ) : (
                            <div className="incoming_msg">
                                <div className="received_msg">
                                    <div className="received_withd_msg">
                                        <p>{msg.Contenido}</p>
                                    </div>
                                </div>
                                <span className="time_date received_time">{calculateTimeAgo(msg.Fecha)}</span>
                            </div>
                        )}
                    </div>
                ))}

            </div>
            <div className="input_msg_write">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                />
                <button className="msg_send_btn" onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    );
};

export default Chat;
