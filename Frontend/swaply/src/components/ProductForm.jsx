import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        Titulo: '',
        Descripcion: '',
        CategoriaID: '',
        Imagenes: [],
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="Titulo"
                placeholder="Título"
                value={form.Titulo}
                onChange={handleChange}
            />
            <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={form.Descripcion}
                onChange={handleChange}
            />
            <select
                name="CategoriaID"
                value={form.CategoriaID}
                onChange={handleChange}
            >
                <option value="">Seleccione una categoría</option>
                {/* Opciones de categoría */}
            </select>
            <button type="submit">Publicar</button>
        </form>
    );
};

export default ProductForm;
