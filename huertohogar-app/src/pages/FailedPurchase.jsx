import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Table, Button, Row, Col, Alert } from 'react-bootstrap';

function FailedPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const orden = location.state?.orden;

  if (!orden) {
    return (
      <Container className="py-5 text-center">
        <h2>No hay información de un pago rechazado reciente</h2>
        <Link to="/carrito" className="btn btn-success mt-3">
          Volver al Carrito
        </Link>
      </Container>
    );
  }

  const { numeroOrden, cliente, items = [], total = 0 } = orden;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={9}>
          <Alert variant="danger" className="d-flex align-items-center gap-3 p-4 shadow-sm mb-4">
            <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
            <div>
              <h3 className="fw-bold mb-1">No se pudo procesar el pago - Orden #{numeroOrden}</h3>
              <p className="mb-0 text-secondary">
                La transacción fue rechazada por la entidad bancaria. No se descontó stock ni se realizó cobro.
              </p>
            </div>
          </Alert>

          <div className="text-center mb-4">
            <Button
              variant="success"
              size="lg"
              className="px-5 py-3 fw-bold shadow"
              onClick={() => navigate('/checkout')}
            >
              <i className="bi bi-arrow-repeat me-2"></i> Reintentar el Pago
            </Button>
          </div>

          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Detalle del Intento de Compra</Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Nombre:</strong>
                  <span>{cliente?.nombre}</span>
                </Col>
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Apellidos:</strong>
                  <span>{cliente?.apellidos}</span>
                </Col>
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Correo:</strong>
                  <span>{cliente?.correo}</span>
                </Col>
                <Col sm={6}>
                  <strong className="d-block text-secondary small">Dirección:</strong>
                  <span>
                    {cliente?.calle} {cliente?.departamento && `(${cliente.departamento})`}
                  </span>
                </Col>
                <Col sm={3}>
                  <strong className="d-block text-secondary small">Comuna:</strong>
                  <span>{cliente?.comuna}</span>
                </Col>
                <Col sm={3}>
                  <strong className="d-block text-secondary small">Región:</strong>
                  <span>{cliente?.region}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {items.length > 0 && (
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-light fw-bold">Productos del Intento</Card.Header>
              <Card.Body className="p-0">
                <Table responsive className="m-0 text-center align-middle">
                  <thead>
                    <tr className="text-secondary small">
                      <th>Imagen</th>
                      <th className="text-start">Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.imagen || '/assets/logo.png'}
                            alt={item.nombre}
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            className="rounded"
                          />
                        </td>
                        <td className="text-start fw-bold">{item.nombre}</td>
                        <td>${item.precio?.toLocaleString('es-CL')}</td>
                        <td>{item.cantidad}</td>
                        <td className="fw-bold">${item.subtotal?.toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          <div className="text-center p-3 bg-light rounded shadow-sm mb-4">
            <h4 className="fw-bold text-dark m-0">
              Total pendiente de pago: ${total.toLocaleString('es-CL')} CLP
            </h4>
          </div>

          <div className="text-center">
            <Link to="/carrito" className="btn btn-outline-secondary me-2">
              Volver al Carrito
            </Link>
            <Link to="/" className="btn btn-outline-success">
              Ir al Inicio
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FailedPurchase;
