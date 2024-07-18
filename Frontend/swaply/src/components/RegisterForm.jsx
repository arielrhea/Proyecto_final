import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
    const [form, setForm] = useState({
        correoelectronico: '',
        NombreUsuario: '',
        Ciudad: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="correoelectronico"
                placeholder="Correo electrónico"
                value={form.correoelectronico}
                onChange={handleChange}
            />
            <input
                type="text"
                name="NombreUsuario"
                placeholder="Nombre de Usuario"
                value={form.NombreUsuario}
                onChange={handleChange}
            />
            <input
                type="text"
                name="Ciudad"
                placeholder="Ciudad"
                value={form.Ciudad}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
            />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
