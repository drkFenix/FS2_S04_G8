import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Card, Table, Button, Row, Col, Alert } from 'react-bootstrap';

function SuccessPurchase() {
  const location = useLocation();
  const navigate = useNavigate();
  const orden = location.state?.orden;

  if (!orden) {
    return (
      <Container className="py-5 text-center">
        <h2>No hay información de orden reciente</h2>
        <Link to="/" className="btn btn-success mt-3">Ir a la Tienda</Link>
      </Container>
    );
  }

  const { cliente, items, total, numeroOrden, fecha } = orden;

  const handleImprimir = () => {
    window.print();
  };

  const handleEnviarEmail = () => {
    alert(`Boleta enviada exitosamente al correo: ${cliente.correo}`);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={9}>
          {/* Banner de Éxito */}
          <Alert variant="success" className="d-flex align-items-center gap-3 p-4 shadow-sm mb-4">
            <div className="fs-1">✅</div>
            <div>
              <h3 className="fw-bold mb-1">Se ha realizado la compra. nro #{numeroOrden}</h3>
              <p className="mb-0 text-secondary">
                ¡Gracias por preferir a HuertoHogar! Tu pedido está siendo preparado para despacho.
              </p>
            </div>
          </Alert>

          {/* Información del Cliente y Entrega */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Detalle del despacho y cliente</Card.Header>
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
                    <strong className="d-block text-secondary small">Indicaciones de entrega:</strong>
                    <span className="fst-italic text-muted">{cliente.indicaciones}</span>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>

          {/* Tabla de Productos Comprados */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Productos en esta orden</Card.Header>
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

          {/* Total Pagado */}
          <div className="text-center p-3 bg-light rounded shadow-sm mb-4">
            <h3 className="fw-bold text-success m-0">
              Total pagado: ${total.toLocaleString('es-CL')} CLP
            </h3>
          </div>

          {/* Acciones */}
          <div className="d-flex justify-content-center gap-3">
            <Button variant="danger" onClick={handleImprimir}>
              📄 Imprimir boleta en PDF
            </Button>
            <Button variant="primary" onClick={handleEnviarEmail}>
              ✉️ Enviar boleta por email
            </Button>
            <Button variant="outline-success" onClick={() => navigate('/')}>
              🏪 Volver a la Tienda
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessPurchase;
