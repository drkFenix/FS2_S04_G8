import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import { getErrorMessage } from '../../utils/getErrorMessage';

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    rol: 'VENDEDOR',
    activo: true,
    comuna: '',
  });

  const cargar = async () => {
    setLoading(true);
    try {
      setUsuarios(await userService.listAll());
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirCrear = () => {
    setEditando(null);
    setFormData({
      nombre: '',
      apellidos: '',
      correo: '',
      password: '',
      rol: 'VENDEDOR',
      activo: true,
      comuna: 'Santiago Centro',
    });
    setShowModal(true);
  };

  const abrirEditar = (u) => {
    setEditando(u);
    setFormData({
      nombre: u.nombre,
      apellidos: u.apellidos || '',
      correo: u.correo,
      password: '',
      rol: u.rol,
      activo: u.activo,
      telefono: u.telefono || '',
      calle: u.calle || '',
      departamento: u.departamento || '',
      region: u.region || '',
      comuna: u.comuna || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editando) {
        await userService.update(editando.id, {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          rol: formData.rol,
          activo: formData.activo,
          password: formData.password || null,
          telefono: formData.telefono,
          calle: formData.calle,
          departamento: formData.departamento,
          region: formData.region,
          comuna: formData.comuna,
        });
        setMensaje({ tipo: 'success', texto: 'Usuario actualizado correctamente.' });
      } else {
        await userService.create({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          correo: formData.correo,
          password: formData.password,
          rol: formData.rol,
          comuna: formData.comuna,
        });
        setMensaje({ tipo: 'success', texto: 'Usuario creado correctamente.' });
      }
      setShowModal(false);
      await cargar();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleDesactivar = async (u) => {
    if (!window.confirm(`¿Desactivar la cuenta de ${u.correo}?`)) return;
    try {
      await userService.remove(u.id);
      setMensaje({ tipo: 'warning', texto: `Cuenta ${u.correo} desactivada.` });
      await cargar();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">Gestión de Usuarios y Roles</h1>
          <p className="text-muted m-0">Control de cuentas Administrador, Vendedor y Cliente en MySQL</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-1"></i> Dashboard
          </Link>
          <Button variant="success" onClick={abrirCrear}>
            <i className="bi bi-person-plus me-1"></i> Nuevo Usuario
          </Button>
        </div>
      </div>

      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)} role="alert">
          {mensaje.texto}
        </Alert>
      )}

      <div className="card border-0 shadow-sm">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : (
          <Table responsive hover className="m-0 align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th className="text-start">Nombre</th>
                <th className="text-start">Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td className="text-start fw-bold">
                    {u.nombre} {u.apellidos}
                  </td>
                  <td className="text-start">{u.correo}</td>
                  <td>
                    <Badge bg={u.rol === 'ADMIN' ? 'primary' : u.rol === 'VENDEDOR' ? 'info' : 'success'}>
                      {u.rol}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={u.activo ? 'success' : 'secondary'}>{u.activo ? 'Activo' : 'Inactivo'}</Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => abrirEditar(u)}>
                        Editar
                      </Button>
                      {u.activo && (
                        <Button variant="outline-danger" size="sm" onClick={() => handleDesactivar(u)}>
                          Desactivar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-2">
              <Form.Label>Correo *</Form.Label>
              <Form.Control
                type="email"
                value={formData.correo}
                disabled={!!editando}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>{editando ? 'Nueva contraseña (opcional, mín. 8)' : 'Contraseña (mín. 8) *'}</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editando}
              />
            </Form.Group>
            <Row className="g-2 align-items-center">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Rol *</Form.Label>
                  <Form.Select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                    <option value="CLIENTE">CLIENTE</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {editando && (
                <Col md={6}>
                  <Form.Check
                    type="switch"
                    id="user-activo"
                    label="Cuenta activa"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="mt-4"
                  />
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
