import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Badge, Row, Col, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { getErrorMessage } from '../../utils/getErrorMessage';

function AdminProducts({ readOnly = false }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [soloCriticos, setSoloCriticos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoriaId: '',
    precio: 1000,
    stock: 100,
    unidad: 'kilo',
    origen: '',
    descripcion: '',
    imagen: '/assets/logo.png',
    enOferta: false,
    precioOferta: '',
  });

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([productService.list(), categoryService.list()]);
      setProductos(prods);
      setCategorias(cats);
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalCrear = () => {
    setProductoEditando(null);
    setFormData({
      codigo: '',
      nombre: '',
      categoriaId: categorias[0]?.id || '',
      precio: 1000,
      stock: 100,
      unidad: 'kilo',
      origen: 'Valle Central de Chile',
      descripcion: '',
      imagen: '/assets/logo.png',
      enOferta: false,
      precioOferta: '',
    });
    setShowModal(true);
  };

  const abrirModalEditar = (prod) => {
    setProductoEditando(prod);
    setFormData({
      codigo: prod.codigo || '',
      nombre: prod.nombre,
      categoriaId: prod.categoriaId || categorias[0]?.id || '',
      precio: prod.precio,
      stock: prod.stock,
      unidad: prod.unidad || 'kilo',
      origen: prod.origen || '',
      descripcion: prod.descripcion || '',
      imagen: prod.imagen || '/assets/logo.png',
      enOferta: !!prod.enOferta,
      precioOferta: prod.precioOferta || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.codigo.trim() || !formData.nombre.trim()) {
      setMensaje({ tipo: 'danger', texto: 'El código y el nombre del producto son obligatorios.' });
      return;
    }

    const payload = {
      codigo: formData.codigo.trim(),
      nombre: formData.nombre.trim(),
      categoriaId: Number(formData.categoriaId),
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      unidad: formData.unidad.trim(),
      origen: formData.origen.trim(),
      descripcion: formData.descripcion.trim(),
      imagen: formData.imagen.trim() || '/assets/logo.png',
      enOferta: formData.enOferta,
      precioOferta: formData.enOferta ? Number(formData.precioOferta) : null,
    };

    setSaving(true);
    try {
      if (productoEditando) {
        await productService.update(productoEditando.id, payload);
        setMensaje({ tipo: 'success', texto: `Producto "${payload.nombre}" actualizado correctamente.` });
      } else {
        await productService.create(payload);
        setMensaje({ tipo: 'success', texto: `Producto "${payload.nombre}" creado exitosamente.` });
      }
      setShowModal(false);
      await cargarDatos();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) return;
    try {
      await productService.remove(id);
      setMensaje({ tipo: 'warning', texto: `Producto "${nombre}" eliminado del inventario.` });
      await cargarDatos();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    }
  };

  const productosFiltrados = productos.filter((p) => {
    const q = filtro.toLowerCase();
    const coincideTexto =
      p.nombre.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q) ||
      (p.codigo && p.codigo.toLowerCase().includes(q));
    const coincideCritico = soloCriticos ? p.stock > 0 && p.stock <= 50 : true;
    return coincideTexto && coincideCritico;
  });

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">
            {readOnly ? 'Catálogo de Productos (Vista Vendedor)' : 'Gestión de Productos'}
          </h1>
          <p className="text-muted m-0">
            {readOnly
              ? 'Consulta de inventario, precios y detalle de productos'
              : 'Administración de inventario, stock y catálogo'}
          </p>
        </div>
        {!readOnly && (
          <div className="d-flex gap-2">
            <Link to="/admin" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-1"></i> Dashboard
            </Link>
            <Button variant="success" onClick={abrirModalCrear}>
              <i className="bi bi-plus-lg me-1"></i> Nuevo Producto
            </Button>
          </div>
        )}
      </div>

      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)} role="alert">
          {mensaje.texto}
        </Alert>
      )}

      <Row className="mb-4 g-2 align-items-center">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar por código, nombre o categoría..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="text-md-end">
          <Form.Check
            type="switch"
            id="filtro-critico"
            label="Mostrar solo Stock Crítico (≤ 50 unidades)"
            checked={soloCriticos}
            onChange={(e) => setSoloCriticos(e.target.checked)}
            className="d-inline-block fw-bold text-danger"
          />
        </Col>
      </Row>

      <div className="card border-0 shadow-sm">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          <Table responsive hover className="m-0 align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Imagen</th>
                <th className="text-start">Nombre</th>
                <th>Categoría</th>
                <th>Origen</th>
                <th>Precio</th>
                <th>Stock</th>
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
                      <td className="fw-bold">{p.codigo}</td>
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
                      <td className="small text-muted">{p.origen}</td>
                      <td>
                        {p.enOferta && p.precioOferta ? (
                          <div>
                            <span className="text-muted text-decoration-line-through small d-block">
                              ${p.precio.toLocaleString('es-CL')}
                            </span>
                            <span className="text-danger fw-bold">${p.precioOferta.toLocaleString('es-CL')}</span>
                          </div>
                        ) : (
                          <span>${p.precio.toLocaleString('es-CL')}</span>
                        )}
                      </td>
                      <td>
                        {sinStock ? (
                          <Badge bg="danger">Agotado (0)</Badge>
                        ) : esCritico ? (
                          <Badge bg="warning" text="dark">
                            Crítico: {p.stock}
                          </Badge>
                        ) : (
                          <span className="fw-semibold text-success">{p.stock}</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link to={`/producto/${p.id}`} className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-eye me-1"></i> Detalle
                          </Link>
                          {!readOnly && (
                            <>
                              <Button variant="outline-primary" size="sm" onClick={() => abrirModalEditar(p)}>
                                <i className="bi bi-pencil me-1"></i> Editar
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleEliminar(p.id, p.nombre)}
                              >
                                <i className="bi bi-trash me-1"></i> Eliminar
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}
      </div>

      {!readOnly && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">
                {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Row className="g-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Código *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="FR004"
                      value={formData.codigo}
                      onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
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
                      value={formData.categoriaId}
                      onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                      required
                    >
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Precio Normal (CLP) *</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Stock *</Form.Label>
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
                    <Form.Label>Unidad de Medida *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.unidad}
                      onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Origen</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.origen}
                      onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ruta de Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.imagen}
                      onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Descripción</Form.Label>
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
                    label="Activar Oferta con Descuento"
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
                        min="1"
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
              <Button variant="success" type="submit" disabled={saving}>
                {saving ? 'Guardando...' : productoEditando ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Container>
  );
}

export default AdminProducts;
