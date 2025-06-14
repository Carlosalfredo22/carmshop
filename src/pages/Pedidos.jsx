
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Importa Footer igual que en Pagos.jsx
import '../style/Pedidos.css';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formulario de nuevo pedido
  const [usuarioId, setUsuarioId] = useState('');
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');

  // Modo edición
  const [editandoId, setEditandoId] = useState(null);
  const [editUsuarioId, setEditUsuarioId] = useState('');
  const [editTotal, setEditTotal] = useState('');
  const [editEstado, setEditEstado] = useState('');
  const [editFechaPedido, setEditFechaPedido] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No estás autenticado');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [resPedidos, resUsuarios] = await Promise.all([
          axios.get('http://localhost:8000/api/pedidos', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/usuarios', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPedidos(resPedidos.data);
        setUsuarios(resUsuarios.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const resetFormulario = () => {
    setUsuarioId('');
    setTotal('');
    setEstado('');
    setFechaPedido('');
    setError(null);
  };

  const crearPedido = (e) => {
    e.preventDefault();
    if (!usuarioId || !total || !estado || !fechaPedido) {
      setError('Todos los campos son obligatorios');
      return;
    }

    axios
      .post(
        'http://localhost:8000/api/pedidos',
        {
          usuario_id: usuarioId,
          total: parseFloat(total),
          estado,
          fecha_pedido: fechaPedido,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPedidos([...pedidos, res.data]);
        resetFormulario();
      })
      .catch(() => setError('Error al crear pedido'));
  };

  const eliminarPedido = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este pedido?')) return;

    axios
      .delete(`http://localhost:8000/api/pedidos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setPedidos(pedidos.filter((p) => p.id !== id));
      })
      .catch(() => setError('Error al eliminar pedido'));
  };

  const iniciarEdicion = (pedido) => {
    setEditandoId(pedido.id);
    setEditUsuarioId(pedido.usuario_id);
    setEditTotal(pedido.total);
    setEditEstado(pedido.estado);
    setEditFechaPedido(pedido.fecha_pedido.slice(0, 16));
    setError(null);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setError(null);
  };

  const actualizarPedido = (e) => {
    e.preventDefault();

    if (!editUsuarioId || !editTotal || !editEstado || !editFechaPedido) {
      setError('Todos los campos son obligatorios');
      return;
    }

    axios
      .put(
        `http://localhost:8000/api/pedidos/${editandoId}`,
        {
          usuario_id: editUsuarioId,
          total: parseFloat(editTotal),
          estado: editEstado,
          fecha_pedido: editFechaPedido,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPedidos(pedidos.map((p) => (p.id === res.data.id ? res.data : p)));
        cancelarEdicion();
      })
      .catch(() => setError('Error al actualizar pedido'));
  };

  if (loading) return <div className="pedidos-loading">Cargando pedidos...</div>;
  if (error) return <div className="pedidos-error">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="pedidos-container">
        <h1>Pedidos</h1>

        {/* Formulario nuevo */}
        <form onSubmit={crearPedido} className="pedidos-form" noValidate>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
            aria-label="Selecciona usuario"
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
            aria-label="Total"
            min="0"
            step="0.01"
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            aria-label="Selecciona estado"
          >
            <option value="">Selecciona estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
          </select>
          <input
            type="datetime-local"
            value={fechaPedido}
            onChange={(e) => setFechaPedido(e.target.value)}
            required
            aria-label="Fecha pedido"
          />
          <button type="submit">Crear</button>
        </form>

        {/* Lista de pedidos */}
        <ul className="pedidos-list">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="pedido-item">
              {editandoId === pedido.id ? (
                <form onSubmit={actualizarPedido} className="pedido-edit-form" noValidate>
                  <select
                    value={editUsuarioId}
                    onChange={(e) => setEditUsuarioId(e.target.value)}
                    required
                    aria-label="Selecciona usuario"
                  >
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={editTotal}
                    onChange={(e) => setEditTotal(e.target.value)}
                    required
                    aria-label="Total"
                    min="0"
                    step="0.01"
                  />
                  <select
                    value={editEstado}
                    onChange={(e) => setEditEstado(e.target.value)}
                    required
                    aria-label="Selecciona estado"
                  >
                    <option value="">Selecciona estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="pagado">Pagado</option>
                  </select>
                  <input
                    type="datetime-local"
                    value={editFechaPedido}
                    onChange={(e) => setEditFechaPedido(e.target.value)}
                    required
                    aria-label="Fecha pedido"
                  />
                  <button type="submit" className="btn-guardar">
                    Guardar
                  </button>
                  <button type="button" onClick={cancelarEdicion} className="btn-cancelar">
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <p>
                    <strong>ID:</strong> {pedido.id}
                  </p>
                  <p>
                    <strong>Usuario:</strong> {pedido.usuario?.name || `ID ${pedido.usuario_id}`}
                  </p>
                  <p>
                    <strong>Total:</strong> ${pedido.total}
                  </p>
                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}
                  </p>
                  <div className="pedido-buttons">
                    <button
                      onClick={() => iniciarEdicion(pedido)}
                      className="btn-editar"
                      aria-label={`Editar pedido ${pedido.id}`}
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => eliminarPedido(pedido.id)}
                      className="btn-eliminar"
                      aria-label={`Eliminar pedido ${pedido.id}`}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Pedidos;