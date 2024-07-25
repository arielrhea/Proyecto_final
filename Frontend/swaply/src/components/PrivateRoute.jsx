import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
    );
};

export default PrivateRoute;
