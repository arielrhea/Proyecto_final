import React from 'react';
import ProductForm from '../components/ProductForm';
import axios from 'axios';

const ProductFormPage = () => {
    const handleFormSubmit = (form) => {
        axios.post('/api/productos', form)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Publicar un nuevo producto</h1>
            <ProductForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default ProductFormPage;
