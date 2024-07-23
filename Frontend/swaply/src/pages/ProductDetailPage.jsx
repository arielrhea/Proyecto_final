import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/producto/${id}`)
            .then((response) => {
                setProduct(response.data[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">Error al cargar los detalles del producto.</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {product ? <ProductDetail product={product} /> : <div>Producto no encontrado.</div>}
            </div>
        </div>
    );
};

export default ProductDetailPage;
