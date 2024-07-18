import React, { createContext, useState, useContext } from 'react';


export const Context = createContext();


export const ContextoProvider = ({ children }) => {
    

    return (
    
        <Context.Provider value={{  }}>
            {children}
        </Context.Provider>
    );
};

