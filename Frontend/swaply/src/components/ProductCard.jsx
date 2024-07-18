import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div>
            <h3>{product.Titulo}</h3>
            <p>{product.Descripcion}</p>
        </div>
    );
};

export default ProductCard;
