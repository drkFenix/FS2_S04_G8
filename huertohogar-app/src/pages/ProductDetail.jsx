import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Form, InputGroup, Card, Alert, Spinner } from 'react-bootstrap';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { role } = useAuth();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    productService
      .findById(id)
      .then((prod) => {
        if (active) setProducto(prod);
      })
      .catch((err) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="text-muted mt-2">Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">{error || 'El producto que buscas no existe o fue eliminado.'}</p>
        <Link to={role === 'VENDEDOR' ? '/vendedor/productos' : '/'} className="btn btn-success mt-3">
          Volver
        </Link>
      </Container>
    );
  }

  const handleAgregar = () => {
    const res = addToCart(producto, cantidad);
    setAlerta(res);
    setTimeout(() => setAlerta(null), 3500);
  };

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)} className="mb-4">
        <i className="bi bi-arrow-left me-1"></i> Volver
      </Button>

      {alerta && (
        <Alert variant={alerta.success ? 'success' : 'danger'} dismissible onClose={() => setAlerta(null)}>
          {alerta.message}
        </Alert>
      )}

      <Card className="border-0 shadow-sm p-4">
        <Row className="g-5 align-items-center">
          <Col md={6}>
            <div className="position-relative bg-light rounded p-3 text-center">
              {producto.enOferta && (
                <Badge bg="warning" text="dark" className="position-absolute top-0 start-0 m-3 px-3 py-2 fs-6">
                  Oferta Especial
                </Badge>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="d-flex gap-2 align-items-center mb-2">
              <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                {producto.categoria}
              </span>
              {producto.codigo && (
                <span className="badge bg-secondary-subtle text-dark px-2 py-2">
                  Código: {producto.codigo}
                </span>
              )}
            </div>
            <h1 className="fw-bold text-dark mb-3">{producto.nombre}</h1>

            <div className="mb-4">
              {producto.enOferta && producto.precioOferta ? (
                <div>
                  <span className="text-muted text-decoration-line-through fs-5 me-2">
                    ${producto.precio.toLocaleString('es-CL')}
                  </span>
                  <span className="display-6 fw-bold text-danger">
                    ${producto.precioOferta.toLocaleString('es-CL')} CLP
                  </span>
                  <span className="text-muted"> /{producto.unidad}</span>
                </div>
              ) : (
                <div>
                  <span className="display-6 fw-bold text-success">
                    ${producto.precio.toLocaleString('es-CL')} CLP
                  </span>
                  <span className="text-muted"> /{producto.unidad}</span>
                </div>
              )}
            </div>

            <p className="lead text-secondary mb-4">{producto.descripcion}</p>

            <div className="p-3 bg-light rounded mb-4">
              <div className="d-flex justify-content-between mb-2">
                <strong>Disponibilidad:</strong>
                {producto.stock > 0 ? (
                  <span className="text-success fw-bold">
                    Disponible ({producto.stock} {producto.unidad}s en inventario)
                  </span>
                ) : (
                  <span className="text-danger fw-bold">Agotado</span>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <strong>Origen:</strong>
                <span className="text-muted">{producto.origen || 'Agricultura local de Chile'}</span>
              </div>
            </div>

            {role !== 'VENDEDOR' && producto.stock > 0 && (
              <div className="d-flex align-items-center gap-3">
                <InputGroup style={{ maxWidth: '140px' }}>
                  <InputGroup.Text>Cant.</InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  />
                </InputGroup>

                <Button variant="success" size="lg" className="flex-grow-1" onClick={handleAgregar}>
                  <i className="bi bi-cart-plus me-1"></i> Agregar al Carrito
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductDetail;
