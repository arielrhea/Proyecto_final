import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import './AccountSettingsPage.css';

const AccountSettingsPage = () => {
    const { userId } = useAuth(); // Obtén el ID del contexto
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            // Recuperar datos del usuario
            axios.get(`http://localhost:8000/api/perfil/${userId}`)
                .then(response => {
                    setFormData({
                        NombreUsuario: response.data.NombreUsuario || '',
                        correoelectronico: response.data.correoelectronico || '',
                        // Agrega otros campos si es necesario
                    });
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al cargar los datos:', error);
                    setError(error);
                    setLoading(false);
                });
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
                        <label htmlFor="NombreUsuario">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="NombreUsuario"
                            name="NombreUsuario"
                            value={formData.NombreUsuario || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="correoelectronico">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correoelectronico"
                            name="correoelectronico"
                            value={formData.correoelectronico || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* Agrega otros campos si es necesario */}
                    <button type="submit" className="submit-button">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
