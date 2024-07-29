import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const MtoProductsForm = () => {
    const { id } = useParams(); // Obtener la ID de la URL
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [images, setImages] = useState([]);
    const { userId } = useAuth();

    const [form, setForm] = useState({
        Titulo: '',
        Descripcion: '',
        CategoriaID: '',
        EstadoProducto: '',
        Imagenes: [],
    });
  
    useEffect(() => {
        // Solicitar el producto a la API usando la ID
        axios.get(`http://localhost:8000/api/producto/${id}`)
            .then((response) => {
                const productoData = response.data[0];
                setProducto(productoData);
                
                // Si hay imágenes, conviértelas a un array
                if (productoData.Imagenes) {
                    const parsedImages = JSON.parse(productoData.Imagenes);
                    setImages(parsedImages);
                    setImagePreviews(parsedImages.map(image => URL.createObjectURL(image)));
                }

                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // Solicitar las categorías a la API
        axios.get('http://localhost:8000/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);
    if(!producto){
        return <p>No existe este producto</p>
    }
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
        formData.append('Titulo', form.Titulo);
        formData.append('Descripcion', form.Descripcion);
        formData.append('CategoriaID', form.CategoriaID);
        formData.append('EstadoProducto', form.EstadoProducto);
        formData.append('UsuarioID', userId);


        
        form.Imagenes.forEach((image, index) => {
            formData.append(`Imagenes[${index}]`, image);
        });

        axios.post('http://localhost:8000/api/producto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            console.log('Producto actualizado:', response.data);
            // Aquí puedes agregar la lógica para redirigir al usuario o mostrar un mensaje de éxito
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (producto && userId != producto.UsuarioID) {
        return <p>No tienes permiso para modificar este producto.</p>;
    }
   

    return (
        <div className="mto-products-form">
            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Titulo"
                    placeholder="Título"
                    defaultValue={producto.Titulo}
                    className="product-form__input"
                    maxLength="100"
                    required
                    onChange={handleInputChange}
                />
                <textarea
                    name="Descripcion"
                    placeholder="Descripción"
                    defaultValue={producto.Descripcion}
                    className="product-form__textarea"
                    maxLength="500"
                    required
                    onChange={handleInputChange}
                />
                <select
                    name="CategoriaID"
                    defaultValue={producto.CategoriaID}
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
                    defaultValue={producto.EstadoProducto}
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
