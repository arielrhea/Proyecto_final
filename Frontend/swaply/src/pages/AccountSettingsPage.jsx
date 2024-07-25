import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import './AccountSettingsPage.css';

const AccountSettingsPage = () => {
    const { userId } = useAuth(); // Obtén el ID del contexto
    const [formData, setFormData] = useState({
        NombreUsuario: '',
        correoelectronico: '',
        password: '',
        ubicacionID: '', // Agregado para la ubicación
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ubicaciones, setUbicaciones] = useState([]); // Agregado para las ubicaciones

    useEffect(() => {
        console.log('userId:', userId); // Verificar si userId está disponible

        const fetchData = async () => {
            try {
                // Recuperar datos del usuario
                const userResponse = await axios.get(`http://localhost:8000/api/usuario/${userId}`);
                console.log('API response:', userResponse.data); // Verificar la respuesta de la API
                const userData = userResponse.data[0][0]; // Asumir que los datos del usuario están en la primera posición del array anidado

                setFormData({
                    NombreUsuario: userData.NombreUsuario || '',
                    correoelectronico: userData.correoelectronico || '',
                    password: '', // Inicializa la contraseña como vacía
                    ubicacionID: userData.UbicacionID || '', // Establece la ubicación
                });

                // Recuperar ubicaciones
                const ubicacionesResponse = await axios.get('http://localhost:8000/api/ubicaciones');
                console.log('Ubicaciones response:', ubicacionesResponse.data);
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
        // Enviar datos del formulario
        axios.post(`http://localhost:8000/api/usuario/${userId}`, formData, {
            headers: { 'Content-Type': 'application/json' },
            params: { method: 'PUT' }
        })
            .then(response => {
                alert('Datos actualizados con éxito.');
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
                alert('Error al actualizar los datos.');
            });
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos.</div>;

    return (
        <div className='account'>
            <div className="account-settings-page">
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
            </div>
        </div>
    );
};

export default AccountSettingsPage;
