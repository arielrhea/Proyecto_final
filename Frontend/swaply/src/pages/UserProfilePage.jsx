import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import ProductCard from '../components/ProductCard'; // Usar ProductCard
import './UserProfilePage.css';
import LoadingScreen from '../components/LoadingScreen';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const { id } = useParams();
    const [usuario, setUser] = useState(null);
    const [productos, setProductos] = useState([]); // Nuevo estado para los productos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false); // Estado para verificar si es el perfil propio
    const navigate = useNavigate();

    // Obtener el ID del usuario autenticado
    const authenticatedUserId = 1; // Aquí deberías obtener el ID del usuario autenticado de tu contexto o estado global

    useEffect(() => {
        // Obtener datos del usuario y productos ofrecidos
        axios.get(`http://localhost:8000/api/perfil/${id}`)
            .then(response => {
                setUser(response.data.usuario);
                setProductos(response.data.productos); // Asumiendo que la API retorna un objeto con 'usuario' y 'productos'
                setLoading(false);

                // Verificar si el perfil es el del usuario autenticado
                if (authenticatedUserId === parseInt(id)) {
                    setIsOwnProfile(true);
                }
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, authenticatedUserId]);

    return (
        <div className="user-profile-page">
            <div className="profile-and-products">
                <div className="profile-content">
                    {loading && <LoadingScreen />}
                    {error && <div className="error-message">Error al cargar el perfil del usuario.</div>}
                    {usuario ? (
                        <>
                            <UserProfile usuario={usuario} />
                            <div className="user-products-section">
                                <h2 className='tituloproductos'>Productos Ofrecidos</h2>
                                <div className="product-card-container">
                                    {productos.length > 0 ? (
                                        productos.map(producto => (
                                            <ProductCard key={producto.ID} product={producto} />
                                        ))
                                    ) : (
                                        <p>Este usuario no ha ofrecido productos.</p>
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
