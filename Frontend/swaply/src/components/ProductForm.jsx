import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ onSubmit, userId }) => {
    const [form, setForm] = useState({
        UsuarioID: userId || '', // Asegúrate de que userId esté inicializado
        Titulo: '',
        Descripcion: '',
        CategoriaID: '',
        EstadoProducto: '',
        Imagenes: [],
    });
    const [categorias, setCategorias] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        // Obtener categorías
        axios.get('http://localhost:8000/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...form.Imagenes];
            newImages[index] = file;
            setForm({ ...form, Imagenes: newImages });

            const newImagePreviews = [...imagePreviews];
            newImagePreviews[index] = URL.createObjectURL(file);
            setImagePreviews(newImagePreviews);
        }
    };

    const handleImageRemove = (index) => {
        const newImages = form.Imagenes.filter((_, i) => i !== index);
        setForm({ ...form, Imagenes: newImages });

        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newImagePreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <input
                type="text"
                name="Titulo"
                placeholder="Título"
                value={form.Titulo}
                onChange={handleChange}
                className="product-form__input"
                maxLength="100"
                required
            />
            <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={form.Descripcion}
                onChange={handleChange}
                className="product-form__textarea"
                maxLength="500"
                required
            />
            <select
                name="CategoriaID"
                value={form.CategoriaID}
                onChange={handleChange}
                className="product-form__select"
                required
            >
                <option value="">Seleccione una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.ID} value={categoria.ID}>
                        {categoria.Nombre}
                    </option>
                ))}
            </select>
            <select
                name="EstadoProducto"
                value={form.EstadoProducto}
                onChange={handleChange}
                className="product-form__select"
                required
            >
                <option value="">Seleccione el estado</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
            </select>
            <input
                type="hidden"
                name="UsuarioID"
                value={form.UsuarioID}
            />
            <div className="product-form__images">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="product-form__image-container">
                        {imagePreviews[index] ? (
                            <div className="product-form__image-preview">
                                <img src={imagePreviews[index]} alt={`Imagen ${index + 1}`} />
                                <button type="button" onClick={() => handleImageRemove(index)} className="product-form__remove-button">
                                    &times;
                                </button>
                            </div>
                        ) : (
                            <label className="product-form__image-label">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="product-form__file-input"
                                />
                                <span>Agregar Imagen</span>
                            </label>
                        )}
                    </div>
                ))}
            </div>
            <button type="submit" className="product-form__button">Publicar</button>
        </form>
    );
};

export default ProductForm;
