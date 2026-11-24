import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { orderService } from '../services/orderService';
import { getErrorMessage } from '../utils/getErrorMessage';

export default function Perfil() {
  const { user, refreshProfile } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    telefono: user?.telefono || '',
    calle: user?.calle || '',
    departamento: user?.departamento || '',
    region: user?.region || 'Región Metropolitana de Santiago',
    comuna: user?.comuna || 'Santiago Centro',
  });
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([userService.getProfile(), orderService.listMine()])
      .then(([perfil, misOrdenes]) => {
        if (!active) return;
        setFormData({
          nombre: perfil.nombre || '',
          apellidos: perfil.apellidos || '',
          telefono: perfil.telefono || '',
          calle: perfil.calle || '',
          departamento: perfil.departamento || '',
          region: perfil.region || 'Región Metropolitana de Santiago',
          comuna: perfil.comuna || 'Santiago Centro',
        });
        setOrdenes(misOrdenes);
      })
      .catch((err) => {
        if (active) setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMensaje(null);
    try {
      await userService.updateProfile(formData);
      await refreshProfile();
      setMensaje({ tipo: 'success', texto: 'Perfil y dirección actualizados correctamente.' });
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold text-success mb-4">Mi Perfil y Mis Órdenes</h1>
      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
          {mensaje.texto}
        </Alert>
      )}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <Row className="g-4">
          <Col lg={5}>
            <Card className="border-0 shadow-sm p-4">
              <h4 className="fw-bold mb-3">Datos Personales y Despacho</h4>
              <p className="text-muted small mb-3">
                Correo: <strong>{user?.correo}</strong> · Rol: <Badge bg="success">{user?.rol}</Badge>
              </p>
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Calle y Número</Form.Label>
                  <Form.Control
                    value={formData.calle}
                    onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Control
                    value={formData.comuna}
                    onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                  />
                </Form.Group>
                <Button type="submit" variant="success" className="w-100" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </Form>
            </Card>
          </Col>
          <Col lg={7}>
            <Card className="border-0 shadow-sm p-4">
              <h4 className="fw-bold mb-3">Historial de Compras ({ordenes.length})</h4>
              {ordenes.length === 0 ? (
                <p className="text-muted">Aún no has realizado compras registradas en tu cuenta.</p>
              ) : (
                <Table responsive hover className="align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Orden</th>
                      <th>Fecha</th>
                      <th>Ítems</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.map((o) => (
                      <tr key={o.id}>
                        <td className="fw-bold text-primary">#{o.numeroOrden}</td>
                        <td>{new Date(o.fecha).toLocaleDateString('es-CL')}</td>
                        <td>{o.items?.length || 0}</td>
                        <td className="fw-bold text-success">${o.total?.toLocaleString('es-CL')}</td>
                        <td>
                          <Badge bg={o.estado === 'COMPLETADA' ? 'success' : o.estado === 'ANULADA' ? 'secondary' : 'danger'}>
                            {o.estado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
