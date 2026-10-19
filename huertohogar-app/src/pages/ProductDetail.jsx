import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import { obtenerProductoPorId } from '../data/db';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    const prod = obtenerProductoPorId(id);
    setProducto(prod);
  }, [id]);

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
        <Link to="/" className="btn btn-success mt-3">
          Volver a la tienda
        </Link>
      </Container>
    );
  }

  const handleAgregar = () => {
    const res = addToCart(producto, cantidad);
    setAlerta(res);
    setTimeout(() => setAlerta(null), 3500);
  };

  const precioFinal = producto.enOferta && producto.precioOferta ? producto.precioOferta : producto.precio;

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)} className="mb-4">
        ← Volver
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
                  🔥 OFERTA ESPECIAL
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
            <span className="badge bg-success-subtle text-success mb-2 px-3 py-2 rounded-pill">
              {producto.categoria}
            </span>
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

            <p className="lead text-secondary mb-4">
              {producto.descripcion}
            </p>

            <div className="p-3 bg-light rounded mb-4">
              <div className="d-flex justify-content-between mb-2">
                <strong>Disponibilidad:</strong>
                {producto.stock > 0 ? (
                  <span className="text-success fw-bold">
                    ✓ En Stock ({producto.stock} {producto.unidad}s disponibles)
                  </span>
                ) : (
                  <span className="text-danger fw-bold">✗ Agotado</span>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <strong>Origen:</strong>
                <span className="text-muted">Agricultura limpia y local de Chile</span>
              </div>
            </div>

            {producto.stock > 0 && (
              <div className="d-flex align-items-center gap-3">
                <InputGroup style={{ maxWidth: '140px' }}>
                  <InputGroup.Text>Cant.</InputGroup.Text>
                  <Form.Control
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </InputGroup>

                <Button variant="success" size="lg" className="flex-grow-1" onClick={handleAgregar}>
                  🛒 Agregar al Carrito
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
