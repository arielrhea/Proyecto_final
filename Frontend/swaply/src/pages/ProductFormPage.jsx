import React from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import './ProductFormPage.css';
import { useNavigate } from 'react-router-dom';

const ProductFormPage = () => {
    const { userId, token } = useAuth(); // Obtén el ID del usuario del contexto
    const navigate = useNavigate();

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
                'token': localStorage.getItem('token'), 
            },
        })
        .then(response => {
            console.log(response);
            window.alert('alta de producto exitosa');
            navigate(`/profile/${userId}`);
        } )
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            console.log('Error response data:', error.response?.data);
        });
    };

    return (
        <div className="product-form-page">
            <h1 className="product-form-page__title">Publicar un nuevo producto</h1>
            <div className="product-form-page__container">
                <ProductForm onSubmit={handleFormSubmit} userId={userId} />
            </div>
        </div>
    );
};

export default ProductFormPage;
