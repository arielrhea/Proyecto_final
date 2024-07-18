import React from 'react';

const ProductDetail = ({ product }) => {
    return (
        <div>
            <h1>{product.Titulo}</h1>
            <p>{product.Descripcion}</p>
            <div>
                {product.Imagenes.map((img, index) => (
                    <img key={index} src={img} alt={`Imagen ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
