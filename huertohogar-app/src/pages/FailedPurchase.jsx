import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Table, Button, Row, Col, Alert } from 'react-bootstrap';

function FailedPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const orden = location.state?.orden;

  const numeroOrden = orden?.numeroOrden || Math.floor(10000000 + Math.random() * 90000000);
  const cliente = orden?.cliente || {
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro.hacker20@example.com',
    calle: 'Los Crisantemos, Edificio Norte',
    departamento: 'Depto 603',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
  };
  const items = orden?.items || [];
  const total = orden?.total || 0;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={9}>
          {/* Banner de Fallo */}
          <Alert variant="danger" className="d-flex align-items-center gap-3 p-4 shadow-sm mb-4">
            <div className="fs-1">⚠️</div>
            <div>
              <h3 className="fw-bold mb-1">No se pudo realizar el pago. nro #{numeroOrden}</h3>
              <p className="mb-0 text-secondary">
                Tu transacción fue rechazada por la entidad emisora o hubo un problema de conexión. No se ha realizado ningún cobro.
              </p>
            </div>
          </Alert>

          {/* Botón Destacado de Reintento */}
          <div className="text-center mb-4">
            <Button
              variant="success"
              size="lg"
              className="px-5 py-3 fw-bold shadow"
              onClick={() => navigate('/checkout')}
            >
              🔄 VOLVER A REALIZAR EL PAGO
            </Button>
          </div>

          {/* Detalle de la compra */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Detalle de la compra</Card.Header>
            <Card.Body className="p-4">
              <Row className="g-3">
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Nombre:</strong>
                  <span>{cliente.nombre}</span>
                </Col>
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Apellidos:</strong>
                  <span>{cliente.apellidos}</span>
                </Col>
                <Col sm={4}>
                  <strong className="d-block text-secondary small">Correo:</strong>
                  <span>{cliente.correo}</span>
                </Col>
                <Col sm={6}>
                  <strong className="d-block text-secondary small">Dirección:</strong>
                  <span>{cliente.calle} {cliente.departamento && `(${cliente.departamento})`}</span>
                </Col>
                <Col sm={3}>
                  <strong className="d-block text-secondary small">Comuna:</strong>
                  <span>{cliente.comuna}</span>
                </Col>
                <Col sm={3}>
                  <strong className="d-block text-secondary small">Región:</strong>
                  <span>{cliente.region}</span>
                </Col>
                {cliente.indicaciones && (
                  <Col sm={12}>
                    <strong className="d-block text-secondary small">Indicaciones para la entrega (opcional):</strong>
                    <span className="fst-italic text-muted">{cliente.indicaciones}</span>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Tabla de Productos */}
          {items.length > 0 && (
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-light fw-bold">Productos que intentabas adquirir</Card.Header>
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
                            src={item.imagen}
                            alt={item.nombre}
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            className="rounded"
                          />
                        </td>
                        <td className="text-start fw-bold">{item.nombre}</td>
                        <td>${item.precio.toLocaleString('es-CL')}</td>
                        <td>{item.cantidad}</td>
                        <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {total > 0 && (
            <div className="text-center p-3 bg-light rounded shadow-sm mb-4">
              <h4 className="fw-bold text-dark m-0">
                Total pendiente de pago: ${total.toLocaleString('es-CL')} CLP
              </h4>
            </div>
          )}

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
