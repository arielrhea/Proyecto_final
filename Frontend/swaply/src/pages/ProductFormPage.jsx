import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ProductFormPage.css';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification'; // Asegúrate de importar tu componente Notification

const ProductFormPage = () => {
    const { userId, token } = useAuth(); // Obtén el ID del usuario del contexto
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');

    const handleFormSubmit = (form) => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        const formData = new FormData();
        formData.append('usuario', userId); // Asegúrate de pasar userId directamente
        formData.append('categoria', form.CategoriaID);
        formData.append('titulo', form.Titulo);
        formData.append('estado', form.EstadoProducto);
        formData.append('descripcion', form.Descripcion);

        form.Imagenes.forEach((imagen, index) => {
            if (imagen) {
                formData.append(`imagenes[${index}]`, imagen);
            }
        });

        axios.post('http://localhost:8000/api/producto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                'token': localStorage.getItem('token'), // Usa el token del contexto
            },
        })
        .then(response => {
            setNotification('Alta de producto exitosa');
            setTimeout(() => {
                setNotification('');
                navigate(`/profile/${userId}`);
            }, 3000); // Redirige después de mostrar la notificación
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            setNotification('Error al enviar el formulario. Rellene todos los campos.');
            console.log('Error response data:', error.response?.data);
            setTimeout(() => setNotification(''), 3000); // Oculta la notificación después de 3 segundos
        });
    };

    return (
        <div className="product-form-page">
            <h1 className="product-form-page__title">Publicar un nuevo producto</h1>
            <div className="product-form-page__container">
                <ProductForm onSubmit={handleFormSubmit} userId={userId} />
            </div>
            <Notification message={notification} onClose={() => setNotification('')} />
        </div>
    );
};

export default ProductFormPage;
