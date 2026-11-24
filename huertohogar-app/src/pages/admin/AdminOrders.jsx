import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { getErrorMessage } from '../../utils/getErrorMessage';

function AdminOrders({ readOnly = false }) {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarOrdenes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await orderService.listAll();
      setOrdenes(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const handleAnular = async (orden) => {
    if (!window.confirm(`¿Anular la orden #${orden.numeroOrden} y restaurar stock?`)) return;
    try {
      const updated = await orderService.updateEstado(orden.id, 'ANULADA');
      setOrdenSeleccionada(updated);
      await cargarOrdenes();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">
            {readOnly ? 'Órdenes y Boletas (Vista Vendedor)' : 'Órdenes y Boletas'}
          </h1>
          <p className="text-muted m-0">Seguimiento de compras y boletas registradas en MySQL</p>
        </div>
        {!readOnly && (
          <Link to="/admin" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-1"></i> Dashboard
          </Link>
        )}
      </div>

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <div className="card border-0 shadow-sm">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
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
                    <td>{new Date(orden.fecha).toLocaleDateString('es-CL')}</td>
                    <td className="text-start">
                      <span className="fw-bold">
                        {orden.cliente?.nombre} {orden.cliente?.apellidos}
                      </span>
                      <br />
                      <small className="text-muted">{orden.cliente?.correo}</small>
                    </td>
                    <td>{orden.cliente?.comuna}</td>
                    <td className="fw-bold text-success">${orden.total?.toLocaleString('es-CL')}</td>
                    <td>
                      <Badge
                        bg={
                          orden.estado === 'COMPLETADA'
                            ? 'success'
                            : orden.estado === 'ANULADA'
                              ? 'secondary'
                              : 'danger'
                        }
                      >
                        {orden.estado}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-info" size="sm" onClick={() => setOrdenSeleccionada(orden)}>
                        <i className="bi bi-receipt me-1"></i> Ver Boleta
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>

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
                  <div className="small text-muted mt-1">
                    Fecha: {new Date(ordenSeleccionada.fecha).toLocaleString('es-CL')}
                  </div>
                </div>
              </div>

              <Row className="mb-4 g-2">
                <Col sm={6}>
                  <strong className="d-block small text-secondary">Cliente:</strong>
                  <span>
                    {ordenSeleccionada.cliente?.nombre} {ordenSeleccionada.cliente?.apellidos}
                  </span>
                  <div className="small text-muted">{ordenSeleccionada.cliente?.correo}</div>
                </Col>
                <Col sm={6}>
                  <strong className="d-block small text-secondary">Dirección de Despacho:</strong>
                  <span>
                    {ordenSeleccionada.cliente?.calle} {ordenSeleccionada.cliente?.departamento}
                  </span>
                  <div className="small text-muted">
                    {ordenSeleccionada.cliente?.comuna}, {ordenSeleccionada.cliente?.region}
                  </div>
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
                  {ordenSeleccionada.items?.map((it) => (
                    <tr key={it.id}>
                      <td className="text-start fw-semibold">
                        {it.codigoProducto ? `[${it.codigoProducto}] ` : ''}
                        {it.nombre}
                      </td>
                      <td>{it.cantidad}</td>
                      <td>${it.precio?.toLocaleString('es-CL')}</td>
                      <td className="fw-bold">${it.subtotal?.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                  <tr className="table-light">
                    <td colSpan="3" className="text-end fw-bold">
                      TOTAL:
                    </td>
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
          {!readOnly && ordenSeleccionada?.estado === 'COMPLETADA' && (
            <Button variant="outline-danger" onClick={() => handleAnular(ordenSeleccionada)}>
              Anular Orden
            </Button>
          )}
          <Button variant="danger" onClick={() => window.print()}>
            <i className="bi bi-printer me-1"></i> Imprimir
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
