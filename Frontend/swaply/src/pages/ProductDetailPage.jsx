import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from '../components/ProductDetail';
import './ProductDetailPage.css';
import LoadingScreen from '../components/LoadingScreen';

const ProductDetailPage = () => {
    const { id } = useParams(); // Obtiene el id del parámetro de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Iniciar la solicitud de datos
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

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                {loading && <LoadingScreen />}
                {error ? (
                    <div className="error-message">Error al cargar los detalles del producto.</div>
                ) : product ? (
                    <ProductDetail product={product} />
                ) : (
                    <div>Producto no encontrado.</div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
