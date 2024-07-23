import React from 'react';
import './LoadingScreen.css'; // Asegúrate de tener este archivo CSS en la misma carpeta

const LoadingScreen = () => {
    return (
        
        <div className="loading-screen-container">
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
