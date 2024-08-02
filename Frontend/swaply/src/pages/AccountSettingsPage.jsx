import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import './AccountSettingsPage.css';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen'; // Asegúrate de tener el componente LoadingScreen
import Notification from '../components/Notification';

const AccountSettingsPage = () => {
    const { userId, token } = useAuth(); // Obtén el ID del contexto
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        NombreUsuario: '',
        correoelectronico: '',
        password: '',
        ubicacionID: '', // Agregado para la ubicación
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicaciones, setUbicaciones] = useState([]); // Agregado para las ubicaciones
    const [notificacion, setNotificacion]=useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Recuperar datos del usuario
                const userResponse = await axios.get(`http://localhost:8000/api/usuario/${userId}`);
                const userData = userResponse.data[0][0]; // Asumir que los datos del usuario están en la primera posición del array anidado

                setFormData({
                    NombreUsuario: userData.NombreUsuario || '',
                    correoelectronico: userData.correoelectronico || '',
                    password: '', // Inicializa la contraseña como vacía
                    ubicacionID: userData.UbicacionID || '', // Establece la ubicación
                });

                // Recuperar ubicaciones
                const ubicacionesResponse = await axios.get('http://localhost:8000/api/ubicaciones');
                setUbicaciones(ubicacionesResponse.data); // Asume que las ubicaciones están directamente en la respuesta

                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError(error);
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotificacion('Esperando respuesta del servidor')
        // Enviar datos del formulario
        axios.post(`http://localhost:8000/api/usuario/${userId}`, formData, {
          
            headers: { 'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            params: { _method: 'PUT' }
        })
            .then(response => {
                setNotificacion('Datos actualizados con éxito!')
                setTimeout(() => {
                localStorage.setItem('username', formData.NombreUsuario);
                navigate(`/profile/${localStorage.getItem('userId')}`);
                setNotificacion('')
                }, 3000);
               
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
                alert('Error al actualizar los datos.');
            });
    };

    return (
        
        <div className='account'>
               <Notification message={notificacion} onClose={() => setNotificacion('')} />
            <div className="account-settings-page">
                {loading && <LoadingScreen />}
                {error && <div className="error-message">Error al cargar los datos.</div>}
                {!loading && !error && (
                    <>
                        <h1>Configuración de Cuenta</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="correoelectronico">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="correoelectronico"
                                    name="correoelectronico"
                                    value={formData.correoelectronico}
                                    readOnly
                                    className="readonly-input" // Agregado para el estilo especial
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="NombreUsuario">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    id="NombreUsuario"
                                    name="NombreUsuario"
                                    value={formData.NombreUsuario}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ubicacion">Ubicación</label>
                                <select
                                    id="ubicacion"
                                    name="ubicacionID"
                                    value={formData.ubicacionID}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione una ubicación</option>
                                    {ubicaciones.map(ubicacion => (
                                        <option key={ubicacion.ID} value={ubicacion.ID}>
                                            {ubicacion.Nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Guardar Cambios</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountSettingsPage;
