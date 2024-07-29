import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './MtoProductsForm.css';



const MtoProductsForm = () => {
    const navigate=useNavigate();
    const { id } = useParams(); // Obtener la ID de la URL
    const [producto, setProducto] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const { userId } = useAuth();
    const [form, setForm] = useState({
        Titulo: '',
        Descripcion: '',
        CategoriaID: '',
        EstadoProducto: '',
        Imagenes: [],
        UsuarioID: ''
    });

    useEffect(() => {
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
                        return `http://localhost:8000/assets/img/productos/${image}`;
                    });
                    setImagePreviews(previews);
                }

                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categorias')
            .then(response => setCategorias(response.data))
            .catch(error => console.error('Error al cargar las categorías:', error));
    }, []);

    const handleImageRemove = (index) => {
        const imageToRemove = form.Imagenes[index];
        
        // Añadir la imagen al estado de imágenes a eliminar
        if (typeof imageToRemove === 'string') {
            setImagesToRemove([...imagesToRemove, imageToRemove]);
        }

        // Actualizar el estado del formulario y la previsualización
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

        // Agregar las imágenes nuevas
        form.Imagenes.forEach((image, index) => {
            if (typeof image === 'string') {
                // Si la imagen es una URL, solo enviar el nombre del archivo
                const imageName = image.split('/').pop();
                formData.append('imagenesExistentes[]', imageName);
            } else {
                // Si la imagen es un Blob (archivo seleccionado), enviar el archivo
                formData.append('imagenes[]', image);
            }
        });

        // Agregar las imágenes a eliminar
        imagesToRemove.forEach(image => {
            formData.append('imagenesAEliminar[]', image);
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
            window.alert('El producto se ha modificado con éxito')
            returnProfile()
           
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
    };
        const returnProfile=()=>{
            navigate(`/profile/${userId}`)
        }
    if (!producto && !loading) return <p>No existe este producto</p>;
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (producto && userId != producto.UsuarioID) return <p>No tienes permiso para modificar este producto.</p>;

    return (
        <div className="mto-products-form">
            <form className="product-form" onSubmit={handleSubmit}>
                <label htmlFor="">Título</label>
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
                <label htmlFor="">Descripción</label>
                <textarea
                    name="Descripcion"
                    placeholder="Descripción"
                    value={form.Descripcion}
                    className="product-form__textarea"
                    maxLength="500"
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="">Categoría</label>
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
                <label htmlFor="">Estado del Producto</label>
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
                <label htmlFor="">Imágenes</label>
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
