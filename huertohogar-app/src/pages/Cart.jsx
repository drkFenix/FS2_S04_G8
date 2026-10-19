import React from 'react';
import { Container, Table, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Card className="border-0 shadow-sm p-5">
          <div className="display-1 text-muted mb-3">🛒</div>
          <h2 className="fw-bold text-secondary mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            Parece que aún no has agregado productos frescos a tu pedido.
          </p>
          <div>
            <Link to="/categorias" className="btn btn-success px-4 py-2">
              Explorar Catálogo
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-success m-0">Carrito de Compras</h1>
        <Button variant="outline-danger" size="sm" onClick={clearCart}>
          🗑️ Vaciar Carrito
        </Button>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-0">
          <Table responsive hover className="align-middle m-0 text-center">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th className="text-start">Nombre</th>
                <th>Precio</th>
                <th style={{ width: '160px' }}>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      className="rounded"
                    />
                  </td>
                  <td className="text-start">
                    <span className="fw-bold text-dark">{item.nombre}</span>
                    <br />
                    <span className="text-muted small">{item.categoria}</span>
                  </td>
                  <td>
                    ${item.precio.toLocaleString('es-CL')} CLP
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      >
                        -
                      </Button>
                      <span className="fw-bold px-2">{item.cantidad}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        disabled={item.cantidad >= item.stock}
                      >
                        +
                      </Button>
                    </div>
                    {item.cantidad >= item.stock && (
                      <span className="text-danger small" style={{ fontSize: '0.75rem' }}>
                        Máx. stock
                      </span>
                    )}
                  </td>
                  <td className="fw-bold text-success">
                    ${item.subtotal.toLocaleString('es-CL')} CLP
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      title="Eliminar producto"
                    >
                      ✕
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Resumen y Acciones */}
      <Row className="justify-content-end">
        <Col md={5} lg={4}>
          <Card className="border-0 shadow-sm p-4 bg-light">
            <h4 className="fw-bold text-dark mb-3">Resumen de Compra</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${cartTotal.toLocaleString('es-CL')} CLP</span>
            </div>
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Envío:</span>
              <span className="text-success fw-bold">Gratis</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
              <span>Total:</span>
              <span className="text-success">${cartTotal.toLocaleString('es-CL')} CLP</span>
            </div>

            <Button
              variant="success"
              size="lg"
              className="w-100 fw-bold shadow-sm"
              onClick={() => navigate('/checkout')}
            >
              Comprar Ahora →
            </Button>
            <Link to="/categorias" className="btn btn-outline-secondary w-100 mt-2">
              Continuar Comprando
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
