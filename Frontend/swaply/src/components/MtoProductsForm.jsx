import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import './MtoProductsForm.css';


const MtoProductsForm = () => {
    const { id } = useParams(); // Obtener la ID de la URL
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [images, setImages] = useState([]);
    const { userId} = useAuth();

    const [form, setForm] = useState({
        Titulo: '',
        Descripcion: '',
        CategoriaID: '',
        EstadoProducto: '',
        Imagenes: [],
        UsuarioID: ''
    });
    //assets/img/productos/[nombre]
    console.log(imagePreviews)
    useEffect(() => {
        // Solicitar el producto a la API usando la ID
        axios.get(`http://localhost:8000/api/producto/${id}`)
            .then((response) => {
                const productoData = response.data[0];
                setProducto(productoData);

                setForm({
                    Titulo: productoData.Titulo,
                    Descripcion: productoData.Descripcion,
                    CategoriaID: productoData.CategoriaID,
                    EstadoProducto: productoData.EstadoProducto,
                    Imagenes: productoData.Imagenes ? JSON.parse(productoData.Imagenes) : [],
                    UsuarioID: productoData.UsuarioID
                });

                if (productoData?.Imagenes) {
                    const parsedImages = JSON.parse(productoData.Imagenes);
                    setImages(parsedImages);
                    const previews = parsedImages.map((image) => {
                        if (typeof image === 'string') {
                            // Si `image` es una URL, usarlo directamente
                            return `http://localhost:8000/assets/img/productos/${image}`;
                        } else if (image instanceof Blob) {
                            // Si `image` es un Blob, crear una URL para ello
                            return URL.createObjectURL(image);
                        }
                        // Si no es ni una URL ni un Blob, manejar el error o loggear
                        console.error("Invalid image format:", image);
                        return null;
                    }).filter(preview => preview !== null); // Filtrar los valores nulos
                    setImagePreviews(previews);
                }

                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);
    
console.log(producto)
    useEffect(() => {
        // Solicitar las categorías a la API
        axios.get('http://localhost:8000/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);

    const handleImageRemove = (index) => {
        const newImages = form.Imagenes.filter((_, i) => i !== index);
        setForm({ ...form, Imagenes: newImages });

        const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newImagePreviews);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', form.Titulo);
        formData.append('descripcion', form.Descripcion);
        formData.append('categoria', form.CategoriaID);
        formData.append('estado', form.EstadoProducto);
        formData.append('usuario', form.UsuarioID);

        form.Imagenes.forEach((image, index) => {
            formData.append(`imagenes[${index}]`, image);
        });

        axios.post(`http://localhost:8000/api/producto/${producto.ID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token'),
            },
            params: { _method: 'PUT' }
        })
        .then(response => {
            console.log('Producto actualizado:', response.data);
            // Aquí puedes agregar la lógica para redirigir al usuario o mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
    };


    if (!producto&&!loading) return <p>No existe este producto</p>;
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (producto && userId != producto.UsuarioID) return <p>No tienes permiso para modificar este producto.</p>;
   

    return (
        <div className="mto-products-form">
            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Titulo"
                    placeholder="Título"
                    value={form.Titulo}
                    className="product-form__input"
                    maxLength="100"
                    required
                    onChange={handleInputChange}
                />
                <textarea
                    name="Descripcion"
                    placeholder="Descripción"
                    value={form.Descripcion}
                    className="product-form__textarea"
                    maxLength="500"
                    required
                    onChange={handleInputChange}
                />
                <select
                    name="CategoriaID"
                    value={form.CategoriaID}
                    className="product-form__select"
                    required
                    onChange={handleInputChange}
                >
                    {categorias.map(categoria => (
                        <option key={categoria.ID} value={categoria.ID}>
                            {categoria.Nombre}
                        </option>
                    ))}
                </select>
                <select
                    name="EstadoProducto"
                    value={form.EstadoProducto}
                    className="product-form__select"
                    required
                    onChange={handleInputChange}
                >
                    <option value="Usado">Usado</option>
                    <option value="Nuevo">Nuevo</option>
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
        </div>
    );
};

export default MtoProductsForm;
