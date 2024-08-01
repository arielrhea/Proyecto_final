// src/context/ChatContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);

    const updateChat = (chatId, newMessage) => {
        setChats(prevChats => 
            prevChats.map(chat => 
                chat.ID === chatId ? { ...chat, lastMessage: newMessage } : chat
            )
        );
    };

    return (
        <ChatContext.Provider value={{ chats, setChats, updateChat }}>
            {children}
        </ChatContext.Provider>
    );
};
