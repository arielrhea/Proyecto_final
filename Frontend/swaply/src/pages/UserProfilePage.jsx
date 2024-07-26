import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import ProductCard from '../components/ProductCard'; // Usar ProductCard
import './UserProfilePage.css';
import LoadingScreen from '../components/LoadingScreen';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth

const UserProfilePage = () => {
    const { id } = useParams();
    const [usuario, setUser] = useState(null);
    const [productos, setProductos] = useState([]); // Nuevo estado para los productos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId, isAuthenticated } = useAuth();


    useEffect(() => {
        // Obtener datos del usuario y productos ofrecidos
        axios.get(`http://localhost:8000/api/perfil/${id}`)
            .then(response => {
                setUser(response.data.usuario);
                setProductos(response.data.productos); // Asumiendo que la API retorna un objeto con 'usuario' y 'productos'
                setLoading(false);
               // console.log(`Autenticated ${isAuthenticated}, productos 0 ${productos[0]} userID ${userId} `)
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const isOwner = (producto) => {
        return producto.UsuarioID == userId;
    };

    return (
        <div className="user-profile-page">
            <div className="profile-and-products">
                <div className="profile-content">
                    {loading && <LoadingScreen />}
                    {error && <div className="error-message">Error al cargar el perfil del usuario.</div>}
                    {usuario ? (
                        <>
                            <UserProfile usuario={usuario} authenticatedUserId={userId} />
                            <div className="user-products-section">
                                <h2 className='tituloproductos'>Productos Ofrecidos</h2>
                                <div className="product-card-container">
                                    {productos.length > 0 ? (
                                        productos.map(producto => (
                                            <div key={producto.ID}>

                                                <ProductCard  product={producto} />
                                                {isAuthenticated && isOwner(producto) && (
                                                    <button className='buttonModificar'>Modificar producto</button>
                                                )}

                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-products-message">Este usuario no ha ofrecido productos.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>Perfil de usuario no encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
