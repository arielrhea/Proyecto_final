import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [form, setForm] = useState({
        correoelectronico: '',
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
        onLogin(form);
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
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
