// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import './Chat.css';

const Chat = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    
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
        axios.get(`http://localhost:8000/api/chats/52/mensajes`)
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
            axios.post(`http://localhost:8000/api/chats/52/mensajes`, { content: newMessage })
                .then(response => {
                    setNewMessage('');
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };

    return (
        <div className="chat">
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Type a message" 
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
