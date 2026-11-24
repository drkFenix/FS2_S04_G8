import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import { getErrorMessage } from '../../utils/getErrorMessage';

export default function AdminCategories() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [saving, setSaving] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      setCategorias(await categoryService.list());
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
    setFormData({ nombre: '', descripcion: '' });
    setShowModal(true);
  };

  const abrirEditar = (cat) => {
    setEditando(cat);
    setFormData({ nombre: cat.nombre, descripcion: cat.descripcion || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editando) {
        await categoryService.update(editando.id, formData);
        setMensaje({ tipo: 'success', texto: 'Categoría actualizada correctamente.' });
      } else {
        await categoryService.create(formData);
        setMensaje({ tipo: 'success', texto: 'Categoría creada correctamente.' });
      }
      setShowModal(false);
      await cargar();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const handleEliminar = async (cat) => {
    if (!window.confirm(`¿Eliminar la categoría "${cat.nombre}"?`)) return;
    try {
      await categoryService.remove(cat.id);
      setMensaje({ tipo: 'warning', texto: `Categoría "${cat.nombre}" eliminada.` });
      await cargar();
    } catch (err) {
      setMensaje({ tipo: 'danger', texto: getErrorMessage(err) });
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">Gestión de Categorías</h1>
          <p className="text-muted m-0">Administración CRUD conectada a `/api/v1/categorias`</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-1"></i> Dashboard
          </Link>
          <Button variant="success" onClick={abrirCrear}>
            <i className="bi bi-plus-lg me-1"></i> Nueva Categoría
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
          <Table responsive hover className="m-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td className="fw-bold">{c.nombre}</td>
                  <td className="text-muted small">{c.descripcion}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => abrirEditar(c)}>
                        Editar
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(c)}>
                        Eliminar
                      </Button>
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
            <Modal.Title>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </Form.Group>
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
