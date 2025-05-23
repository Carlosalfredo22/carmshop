import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Navbar importado
import '../style/Home.css'; // Estilos generales

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los productos de la API
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No estás autenticado');
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://localhost:8000/api/productos', config) // Asegúrate de que la URL es correcta
      .then((response) => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
        setError('Error al cargar los productos');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Productos</h1>
        <ul style={styles.productList}>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <li key={producto.id} style={styles.productCard}>
                <img
                  src={`http://localhost:8000/images/${producto.imagen_url}`} // Ruta de imagen
                  alt={producto.nombre}
                  style={styles.productImage}
                />
                <div>
                  <h3 style={styles.productName}>{producto.nombre}</h3>
                  <p style={styles.productDescription}>{producto.descripcion}</p>
                  <p style={styles.productPrice}>Precio: ${producto.precio}</p>
                  <p style={styles.productStock}>Stock: {producto.stock}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No hay productos disponibles.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f5f0e6', // Fondo claro en tonos café
    padding: '20px',
    minHeight: '100vh',
  },
  mainContent: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#4d3c28', // Título en tono café oscuro
    marginBottom: '30px',
  },
  productList: {
    listStyle: 'none',
    padding: 0,
  },
  productCard: {
    backgroundColor: '#fff',
    border: '1px solid #bfa980', // Borde dorado suave
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 6px rgba(191, 169, 128, 0.2)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  productCardHover: {
    transform: 'scale(1.05)', // Hover para agrandar un poco la tarjeta
  },
  productImage: {
    width: '100px',
    borderRadius: '8px',
  },
  productName: {
    fontSize: '1.5rem',
    color: '#4d3c28', // Título del producto en color café oscuro
    margin: '0 0 10px',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#4d3c28', // Descripción en color café
    margin: '0',
  },
  productPrice: {
    fontSize: '1.1rem',
    color: '#4d3c28', // Precio en color café
    margin: '5px 0',
  },
  productStock: {
    fontSize: '1rem',
    color: '#4d3c28', // Stock en color café
    margin: '0',
  },
};

export default Productos;