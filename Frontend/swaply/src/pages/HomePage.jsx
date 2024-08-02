import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Añadimos un archivo CSS para HomePage
import { useContexto } from '../context/Context';
import LoadingScreen from '../components/LoadingScreen';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas

    // Variables para los filtros
    const { idCategoria, busqueda, nombreEstado, recientes, ubicacion } = useContexto();

    useEffect(() => {
        setLoading(true); // Mostrar loading antes de la solicitud
      
        // Construir la URL de la solicitud con el parámetro de página
        const fetchUrl = `http://localhost:8000/api/productos?busqueda=${busqueda}&categoria=${idCategoria}&estado=${nombreEstado}&recientes=${recientes}&ubicacion=${ubicacion}&page=${currentPage}`;

        // Realizar la solicitud a la API
        axios.get(fetchUrl)
            .then(response => {
                setProducts(response.data.data); // Setear solo los productos
                setTotalPages(response.data.last_page); // Total de páginas
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                setLoading(false);
            });
    }, [busqueda, idCategoria, nombreEstado, recientes, ubicacion, currentPage]); // Añadimos currentPage a las dependencias

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="home-page">
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div>
                    <div className="product-flex">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard className="product-item" key={product.ID} product={product} />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &laquo; Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button 
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next &raquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
