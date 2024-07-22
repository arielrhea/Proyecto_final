import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Añadimos un archivo CSS para HomePage

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Mostrar loading antes de la solicitud
        axios.get(`http://localhost:8000/api/productos`)
            .then(response => {
                // Asume que los datos se encuentran en response.data.items y totalPages en response.data.totalPages
                setProducts(response.data);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="home-page">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="product-grid">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product.ID} product={product} />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index + 1} 
                                onClick={() => handlePageChange(index + 1)}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
