import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Card, Table, Button, Row, Col, Alert } from 'react-bootstrap';

function SuccessPurchase() {
  const location = useLocation();
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
          <Alert variant="success" className="d-flex align-items-center gap-3 p-4 shadow-sm mb-4">
            <i className="bi bi-check-circle-fill text-success fs-1"></i>
            <div>
              <h3 className="fw-bold mb-1">Compra confirmada - Orden #{numeroOrden}</h3>
              <p className="mb-0 text-secondary">
                Tu pedido ha sido recibido con éxito y está siendo preparado para despacho.
              </p>
            </div>
          </Alert>

          {/* Detalle del cliente y despacho */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Detalle del Despacho</Card.Header>
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

          {/* Desglose de productos comprados */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Productos de la Orden</Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="m-0 text-center align-middle">
                <thead>
                  <tr className="text-secondary small">
                    <th>Imagen</th>
                    <th className="text-start">Nombre</th>
                    <th>Precio Unit.</th>
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
                  <tr className="table-light">
                    <td colSpan="4" className="text-end fw-bold">TOTAL PAGADO:</td>
                    <td className="fw-bold text-success fs-5">
                      ${total.toLocaleString('es-CL')} CLP
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="d-flex gap-2">
              <Button variant="danger" onClick={handleImprimir}>
                <i className="bi bi-printer me-1"></i> Imprimir Boleta
              </Button>
              <Button variant="outline-secondary" onClick={handleEnviarEmail}>
                <i className="bi bi-envelope me-1"></i> Enviar por Correo
              </Button>
            </div>
            <Link to="/" className="btn btn-success">
              Volver a la Tienda
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SuccessPurchase;
