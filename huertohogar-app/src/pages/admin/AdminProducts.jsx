import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Badge, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../../data/db';

const CATEGORIAS_VALIDAS = [
  'Frutas Frescas',
  'Verduras Orgánicas',
  'Productos Orgánicos',
  'Productos Lácteos'
];

function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [soloCriticos, setSoloCriticos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  // Formulario modal
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Frutas Frescas',
    precio: 1000,
    stock: 100,
    unidad: 'kilo',
    descripcion: '',
    imagen: '/assets/logo.png',
    enOferta: false,
    precioOferta: ''
  });

  const cargarDatos = () => {
    setProductos(obtenerProductos());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalCrear = () => {
    setProductoEditando(null);
    setFormData({
      nombre: '',
      categoria: 'Frutas Frescas',
      precio: 1000,
      stock: 100,
      unidad: 'kilo',
      descripcion: '',
      imagen: '/assets/logo.png',
      enOferta: false,
      precioOferta: ''
    });
    setShowModal(true);
  };

  const abrirModalEditar = (prod) => {
    setProductoEditando(prod);
    setFormData({
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: prod.precio,
      stock: prod.stock,
      unidad: prod.unidad || 'kilo',
      descripcion: prod.descripcion || '',
      imagen: prod.imagen || '/assets/logo.png',
      enOferta: !!prod.enOferta,
      precioOferta: prod.precioOferta || ''
    });
    setShowModal(true);
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar "${nombre}" del catálogo?`)) {
      eliminarProducto(id);
      cargarDatos();
      setMensaje({ tipo: 'success', texto: `Producto "${nombre}" eliminado correctamente.` });
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es obligatorio.');
      return;
    }

    if (productoEditando) {
      actualizarProducto(productoEditando.id, formData);
      setMensaje({ tipo: 'success', texto: `Producto "${formData.nombre}" actualizado correctamente.` });
    } else {
      crearProducto(formData);
      setMensaje({ tipo: 'success', texto: `Nuevo producto "${formData.nombre}" creado exitosamente.` });
    }

    setShowModal(false);
    cargarDatos();
    setTimeout(() => setMensaje(null), 3000);
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      p.categoria.toLowerCase().includes(filtro.toLowerCase());
    const coincideCritico = soloCriticos ? p.stock > 0 && p.stock <= 50 : true;
    return coincideTexto && coincideCritico;
  });

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">Gestión de Inventario y Productos</h1>
          <p className="text-muted m-0">Operaciones CRUD con persistencia en tiempo real</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin" className="btn btn-outline-secondary">
            ← Volver al Dashboard
          </Link>
          <Button variant="success" onClick={abrirModalCrear}>
            + Nuevo Producto
          </Button>
        </div>
      </div>

      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
          {mensaje.texto}
        </Alert>
      )}

      {/* Filtros */}
      <Row className="mb-4 g-2 align-items-center">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Buscar por nombre o categoría..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="text-md-end">
          <Form.Check
            type="switch"
            id="filtro-critico"
            label="⚠️ Mostrar solo Stock Crítico (≤ 50 unidades)"
            checked={soloCriticos}
            onChange={(e) => setSoloCriticos(e.target.checked)}
            className="d-inline-block fw-bold text-danger"
          />
        </Col>
      </Row>

      {/* Tabla CRUD */}
      <div className="card border-0 shadow-sm">
        <Table responsive hover className="m-0 align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th className="text-start">Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado / Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 text-muted">
                  No se encontraron productos con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              productosFiltrados.map((p) => {
                const esCritico = p.stock > 0 && p.stock <= 50;
                const sinStock = p.stock <= 0;
                return (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    </td>
                    <td className="text-start fw-bold">{p.nombre}</td>
                    <td>
                      <span className="badge bg-light text-dark border">{p.categoria}</span>
                    </td>
                    <td>
                      {p.enOferta && p.precioOferta ? (
                        <div>
                          <span className="text-muted text-decoration-line-through small d-block">
                            ${p.precio.toLocaleString('es-CL')}
                          </span>
                          <span className="text-danger fw-bold">
                            ${p.precioOferta.toLocaleString('es-CL')}
                          </span>
                        </div>
                      ) : (
                        <span>${p.precio.toLocaleString('es-CL')}</span>
                      )}
                    </td>
                    <td>
                      {sinStock ? (
                        <Badge bg="danger">Agotado (0)</Badge>
                      ) : esCritico ? (
                        <Badge bg="warning" text="dark">Crítico: {p.stock}</Badge>
                      ) : (
                        <span className="fw-semibold text-success">{p.stock}</span>
                      )}
                    </td>
                    <td>
                      {p.enOferta ? (
                        <Badge bg="warning" text="dark">🔥 En Oferta</Badge>
                      ) : (
                        <span className="text-muted small">Normal</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => abrirModalEditar(p)}
                        >
                          ✏️ Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleEliminar(p.id, p.nombre)}
                        >
                          🗑️ Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal para Crear / Editar Producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">
            {productoEditando ? `Editar: ${productoEditando.nombre}` : 'Crear Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleGuardar}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Nombre del Producto *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  >
                    {CATEGORIAS_VALIDAS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Precio Normal (CLP) *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Stock Disponible *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Unidad de Medida</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="kilo, litro, frasco..."
                    value={formData.unidad}
                    onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Ruta de Imagen (URL o /assets/...)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.imagen}
                    onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Descripción del Producto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Check
                  type="switch"
                  id="switch-oferta"
                  label="🔥 Activar Oferta con Descuento"
                  checked={formData.enOferta}
                  onChange={(e) => setFormData({ ...formData, enOferta: e.target.checked })}
                  className="mt-3 fw-bold"
                />
              </Col>
              {formData.enOferta && (
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Precio de Oferta (CLP) *</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={formData.precioOferta}
                      onChange={(e) => setFormData({ ...formData, precioOferta: e.target.value })}
                      required={formData.enOferta}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              {productoEditando ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminProducts;
