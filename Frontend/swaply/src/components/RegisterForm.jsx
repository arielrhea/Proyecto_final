import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Agrega estilos según sea necesario

const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        img: '',
        ubicacion: '', // Cambiado a ubicacion
    });
    const [ubicaciones, setUbicaciones] = useState([]);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({}); // Para manejar errores de validación

    useEffect(() => {
        const fetchUbicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ubicaciones');
                setUbicaciones(response.data);
                console.log('Ubicaciones cargadas:', response.data); // Debugging
            } catch (error) {
                console.error('Error al cargar ubicaciones:', error);
                setError('Error al cargar ubicaciones.');
            }
        };

        fetchUbicaciones();
    }, []);

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (!form.email) {
            errors.email = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = 'El correo electrónico no es válido.';
            isValid = false;
        }

        if (!form.username) {
            errors.username = 'El nombre de usuario es obligatorio.';
            isValid = false;
        }

        if (!form.ubicacion) {
            errors.ubicacion = 'La ubicación es obligatoria.';
            isValid = false;
        }

        if (!form.password) {
            errors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (form.password.length < 4) {
            errors.password = 'La contraseña debe tener al menos 4 caracteres.';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm({
                ...form,
                img: file
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('email', form.email);
            formData.append('username', form.username);
            formData.append('password', form.password);
            formData.append('ubicacion', form.ubicacion);
            if (form.img) {
                formData.append('img', form.img);
            }

            const response = await axios.post('http://localhost:8000/api/registro', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Respuesta del servidor:', response.data); // Debugging
            alert('Registro exitoso');
            // Opcional: Redirigir al usuario a la página de inicio de sesión o al perfil
        } catch (error) {
            console.error('Error al registrar:', error.response || error.message); // Debugging
            setError('Error al registrar. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="register-page">
            
            <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de Usuario"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                {errors.username && <p className="error-message">{errors.username}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength="4" // Validación HTML
                />
                {errors.password && <p className="error-message">{errors.password}</p>}

                <input
                    type="file"
                    name="img"
                    onChange={handleFileChange}
                />

                <select
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una ubicación</option>
                    {ubicaciones.map((ubicacion) => (
                        <option key={ubicacion.ID} value={ubicacion.ID}>
                            {ubicacion.Nombre}
                        </option>
                    ))}
                </select>
                {errors.ubicacion && <p className="error-message">{errors.ubicacion}</p>}

                <button type="submit" className='register-button'>Registrarse</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterPage;
