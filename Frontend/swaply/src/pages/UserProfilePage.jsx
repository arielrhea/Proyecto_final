import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import ProductCard from '../components/ProductCard'; // Usar ProductCard
import './UserProfilePage.css';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth
import Notification from '../components/Notification';
import ConfirmationModal from '../components/ConfirmationModal'; // Importar ConfirmationModal

const UserProfilePage = () => {
    const { id } = useParams();
    const [usuario, setUser] = useState(null);
    const [productos, setProductos] = useState([]); // Nuevo estado para los productos
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId, isAuthenticated, token } = useAuth(); // Obtener token de autenticación
    const navigate = useNavigate();
    const [notification, setNotification] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        // Obtener datos del usuario y productos ofrecidos
        axios.get(`http://localhost:8000/api/perfil/${id}`)
            .then(response => {
                setUser(response.data.usuario);
                setProductos(response.data.productos); // Asumiendo que la API retorna un objeto con 'usuario' y 'productos'
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const isOwner = (producto) => {
        return producto.UsuarioID == userId;
    };

    const handleDeleteProduct = (product) => {
        setProductToDelete(product);
        setShowConfirmation(true);
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) return;
        try {
            console.log()
            await axios.delete(`http://localhost:8000/api/producto/${productToDelete.ID}`, {
                headers: {" token":localStorage.getItem('token') } // Incluye el token en el encabezado
            });
            // Filtrar el producto eliminado del estado
            setNotification(`${productToDelete.Titulo} se ha eliminado correctamente`);
            setProductos(productos.filter(producto => producto.ID !== productToDelete.ID));
            setShowConfirmation(false);
            setProductToDelete(null);
            setTimeout(() => {
                setNotification('');
            }, 3000);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto.');
        }
    };

    const cancelDeleteProduct = () => {
        setShowConfirmation(false);
        setProductToDelete(null);
    };

    return (
        <div className="user-profile-page">
            <Notification message={notification} onClose={() => setNotification('')} />

            {showConfirmation && (
                <ConfirmationModal
                    message="¿Está seguro de que quiere eliminar este regalo?"
                    onConfirm={confirmDeleteProduct}
                    onCancel={cancelDeleteProduct}
                />
            )}

            <div className="profile-and-products">
                <div className="profile-content">
                    {loading && <LoadingScreen />}
                    {error && <div className="error-message">Error al cargar el perfil del usuario.</div>}
                    {usuario ? (
                        <>
                            <UserProfile usuario={usuario} authenticatedUserId={userId} />
                            <div className="user-products-section">
                                <h2 className='tituloproductos'>Regalos ofrecidos</h2>
                                <div className="product-card-container">
                                    {productos.length > 0 ? (
                                        productos.map(producto => (
                                            <div key={producto.ID}>
                                                <ProductCard product={producto} />
                                                {isAuthenticated && isOwner(producto) && (
                                                    <>
                                                        <button className='buttonModificar' onClick={() => {
                                                            navigate(`/mto/${producto.ID}`);
                                                        }}>Modificar producto</button>
                                                        <button className='buttonEliminar' onClick={() => handleDeleteProduct(producto)}>Eliminar</button>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-products-message">¡Aún no se han ofrecido regalos!</p>
                                    )}
                                    {isAuthenticated && userId == id && (
                                        <button className='agregar-button' onClick={() => { navigate('/new-product') }}>Agregar un nuevo regalo</button>
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
