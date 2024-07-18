import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/productos/${match.params.id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [match.params.id]);

    return (
        <div>
            {product ? <ProductDetail product={product} /> : <p>Cargando...</p>}
        </div>
    );
};

export default ProductDetailPage;
