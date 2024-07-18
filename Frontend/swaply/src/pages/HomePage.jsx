import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/inicio')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.ID} product={product} />
            ))}
        </div>
    );
};

export default HomePage;
