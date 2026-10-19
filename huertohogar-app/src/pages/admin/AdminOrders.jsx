import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../data/db';

function AdminOrders() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    setOrdenes(obtenerOrdenes());
  }, []);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">Órdenes y Boletas</h1>
          <p className="text-muted m-0">Seguimiento de compras y despachos de clientes</p>
        </div>
        <Link to="/admin" className="btn btn-outline-secondary">
          ← Volver al Dashboard
        </Link>
      </div>

      <div className="card border-0 shadow-sm">
        <Table responsive hover className="m-0 align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>N° Orden</th>
              <th>Fecha</th>
              <th className="text-start">Cliente</th>
              <th>Comuna</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-muted">
                  No hay órdenes registradas aún.
                </td>
              </tr>
            ) : (
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td className="fw-bold text-primary">#{orden.numeroOrden}</td>
                  <td>{orden.fecha}</td>
                  <td className="text-start">
                    <span className="fw-bold">{orden.cliente?.nombre} {orden.cliente?.apellidos}</span>
                    <br />
                    <small className="text-muted">{orden.cliente?.correo}</small>
                  </td>
                  <td>{orden.cliente?.comuna}</td>
                  <td className="fw-bold text-success">${orden.total?.toLocaleString('es-CL')}</td>
                  <td>
                    {orden.estado === 'completada' ? (
                      <Badge bg="success">Pagada / Exitosa</Badge>
                    ) : (
                      <Badge bg="danger">Rechazada / Error</Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => setOrdenSeleccionada(orden)}
                    >
                      🧾 Ver Boleta
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal de Detalle de Boleta */}
      <Modal show={!!ordenSeleccionada} onHide={() => setOrdenSeleccionada(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">
            Boleta Electrónica #{ordenSeleccionada?.numeroOrden}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {ordenSeleccionada && (
            <div>
              <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <h5 className="fw-bold text-dark m-0">HuertoHogar SpA</h5>
                  <small className="text-muted">RUT: 76.890.123-4 | Giro: Venta de alimentos agrícolas</small>
                </div>
                <div className="text-end">
                  <span className="badge bg-success-subtle text-success fs-6">BOLETA ELECTRÓNICA</span>
                  <div className="small text-muted mt-1">Fecha: {ordenSeleccionada.fecha}</div>
                </div>
              </div>

              <Row className="mb-4 g-2">
                <Col sm={6}>
                  <strong className="d-block small text-secondary">Cliente:</strong>
                  <span>{ordenSeleccionada.cliente?.nombre} {ordenSeleccionada.cliente?.apellidos}</span>
                  <div className="small text-muted">{ordenSeleccionada.cliente?.correo}</div>
                </Col>
                <Col sm={6}>
                  <strong className="d-block small text-secondary">Dirección de Despacho:</strong>
                  <span>{ordenSeleccionada.cliente?.calle} {ordenSeleccionada.cliente?.departamento}</span>
                  <div className="small text-muted">{ordenSeleccionada.cliente?.comuna}, {ordenSeleccionada.cliente?.region}</div>
                </Col>
              </Row>

              <Table responsive bordered className="text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="text-start">Detalle</th>
                    <th>Cant.</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenSeleccionada.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td className="text-start fw-semibold">{it.nombre}</td>
                      <td>{it.cantidad}</td>
                      <td>${it.precio?.toLocaleString('es-CL')}</td>
                      <td className="fw-bold">${(it.precio * it.cantidad)?.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                  <tr className="table-light">
                    <td colSpan="3" className="text-end fw-bold">TOTAL PAGADO:</td>
                    <td className="fw-bold text-success fs-5">
                      ${ordenSeleccionada.total?.toLocaleString('es-CL')} CLP
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => window.print()}>
            🖨️ Imprimir
          </Button>
          <Button variant="secondary" onClick={() => setOrdenSeleccionada(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminOrders;
