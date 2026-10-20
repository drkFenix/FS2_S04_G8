import React, { useState } from 'react';
import { Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState(null);

  const esCritico = producto.stock > 0 && producto.stock <= 50;
  const sinStock = producto.stock <= 0;

  const handleAgregar = () => {
    const res = addToCart(producto, cantidad);
    setMensaje(res.message);
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <Card className="h-100 shadow-sm border-0 position-relative hover-shadow transition">
      {producto.enOferta && (
        <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-3 px-3 py-2 fs-6 shadow-sm">
          🔥 OFERTA
        </Badge>
      )}

      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <span className="text-muted small mb-1">{producto.categoria}</span>
        <Card.Title className="fs-5 fw-bold text-success mb-2">
          {producto.nombre}
        </Card.Title>

        <div className="mb-2">
          {producto.enOferta && producto.precioOferta ? (
            <div>
              <span className="text-muted text-decoration-line-through me-2">
                ${producto.precio.toLocaleString('es-CL')}
              </span>
              <span className="fs-5 fw-bold text-danger">
                ${producto.precioOferta.toLocaleString('es-CL')} CLP
              </span>
              <span className="text-muted small"> /{producto.unidad}</span>
            </div>
          ) : (
            <div>
              <span className="fs-5 fw-bold text-dark">
                ${producto.precio.toLocaleString('es-CL')} CLP
              </span>
              <span className="text-muted small"> /{producto.unidad}</span>
            </div>
          )}
        </div>

        <div className="mb-2">
          {sinStock ? (
            <Badge bg="danger">Agotado</Badge>
          ) : esCritico ? (
            <Badge bg="warning" text="dark">Stock Crítico: {producto.stock} {producto.unidad}s</Badge>
          ) : (
            <span className="text-muted small">Stock: {producto.stock} {producto.unidad}s</span>
          )}
        </div>

        <Card.Text className="text-secondary small flex-grow-1" style={{ minHeight: '40px' }}>
          {producto.descripcion}
        </Card.Text>

        {mensaje && (
          <div className="alert alert-info py-1 px-2 small mb-2 text-center" role="alert">
            {mensaje}
          </div>
        )}

        <div className="mt-auto">
          {!sinStock && (
            <InputGroup size="sm" className="mb-2">
              <InputGroup.Text>Cant.</InputGroup.Text>
              <Form.Control
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <Button variant="success" onClick={handleAgregar}>
                <i className="bi bi-cart-plus me-1"></i> Agregar
              </Button>
            </InputGroup>
          )}

          <Link to={`/producto/${producto.id}`} className="btn btn-outline-secondary btn-sm w-100">
            Ver Detalle
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
