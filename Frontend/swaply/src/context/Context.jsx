import React, { createContext, useState, useContext } from 'react';


export const Contexto = createContext();


export const ContextoProvider = ({ children }) => {
    
   
    return (
       
        <Contexto.Provider value={{  }}>
            {children}
        </Contexto.Provider>
    );
};

