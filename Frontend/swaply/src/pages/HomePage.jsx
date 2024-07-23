import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css'; // Añadimos un archivo CSS para HomePage
import { useContexto } from '../context/Context';
import LoadingScreen from '../components/LoadingScreen';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Variables para los filtros
    const { idCategoria, busqueda } = useContexto();

    useEffect(() => {
        setLoading(true); // Mostrar loading antes de la solicitud
      
        // Mostrar en consola los valores actuales de los filtros
        console.log(`ID Categoría: ${idCategoria}, Busqueda: ${busqueda}`);

        // Construir la URL de la solicitud
        const fetchUrl = `http://localhost:8000/api/productos?busqueda=${encodeURIComponent(busqueda)}&categoria=${encodeURIComponent(idCategoria)}`;

        // Realizar la solicitud a la API
        axios.get(fetchUrl)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                setLoading(false);
            });
    }, [busqueda, idCategoria]); // Añadimos busqueda y idCategoria a las dependencias

    return (
        <div className="home-page">
            {loading ? (
                <LoadingScreen/>
            ) : (
<<<<<<< Updated upstream
                <div className="product-flex">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard className="product-item" key={product.ID} product={product} />
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
=======
                <>
                    <div className="product-flex">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard className="product-item" key={product.ID} product={product} />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </>
>>>>>>> Stashed changes
            )}
        </div>
    );
};

export default HomePage;
