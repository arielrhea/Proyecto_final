import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Añadimos un archivo CSS para HomePage
import { useContexto } from '../context/Context';
import LoadingScreen from '../components/LoadingScreen';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { busqueda } = useContexto();

    useEffect(() => {
        setLoading(true); // Mostrar loading antes de la solicitud
        axios.get(`http://localhost:8000/api/productos?busqueda=${busqueda}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [busqueda]); // Añadimos busqueda a las dependencias

    return (
        <div className="home-page">
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div className="product-flex">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard className="product-item" key={product.ID} product={product} />
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
