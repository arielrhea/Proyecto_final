import React from 'react';
import MtoProductsForm from '../components/MtoProductsForm';
import './MtoProductPage.css';

const MtoProductsPage = () => {
    return (
        <div className="mto-products-page">
              
            
            <div className="product-form-page__container">
            <h1 className="mto-product-form-page__title">Mantenimiento del producto</h1>
                <MtoProductsForm />
            </div>
        </div>
      
    );
};

export default MtoProductsPage;