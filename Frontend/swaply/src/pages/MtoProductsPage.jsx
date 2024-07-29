import React from 'react';
import MtoProductsForm from '../components/MtoProductsForm';

const MtoProductsPage = () => {
    return (
        <div className="mto-products-page">
              
            <h1 className="product-form-page__title">Mantenimiento del producto</h1>
            <div className="product-form-page__container">
                <MtoProductsForm/>
            </div>
        </div>
      
    );
};

export default MtoProductsPage;