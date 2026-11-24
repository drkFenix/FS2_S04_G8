import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    calle: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago Centro',
  });
  const [errores, setErrores] = useState({});
  const [apiError, setApiError] = useState('');
  const [saving, setSaving] = useState(false);

  const validar = () => {
    const err = {};
    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      err.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }
    if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
      err.correo = 'Ingresa un correo electrónico válido.';
    }
    if (formData.password.length < 8) {
      err.password = 'La contraseña debe contener al menos 8 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valErr = validar();
    setErrores(valErr);
    if (Object.keys(valErr).length > 0) return;

    setSaving(true);
    setApiError('');
    try {
      await register({
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        correo: formData.correo.trim(),
        password: formData.password,
        telefono: formData.telefono.trim(),
        calle: formData.calle.trim(),
        region: formData.region,
        comuna: formData.comuna,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '60px' }} className="mb-2" />
              <h2 className="fw-bold text-success">Crear una Cuenta</h2>
              <p className="text-muted small">Únete a nuestra comunidad de consumidores conscientes</p>
            </div>

            {apiError && (
              <Alert variant="danger" role="alert">
                {apiError}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="reg-nombre">Nombre *</Form.Label>
                    <Form.Control
                      id="reg-nombre"
                      type="text"
                      placeholder="Ej: Bryan"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="reg-apellidos">Apellidos</Form.Label>
                    <Form.Control
                      id="reg-apellidos"
                      type="text"
                      placeholder="Ej: Rodríguez"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="reg-correo">Correo Electrónico *</Form.Label>
                <Form.Control
                  id="reg-correo"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  isInvalid={!!errores.correo}
                />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>

              <Row className="g-2">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="reg-password">Contraseña (mín. 8) *</Form.Label>
                    <Form.Control
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      isInvalid={!!errores.password}
                    />
                    <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="reg-confirm">Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      id="reg-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      isInvalid={!!errores.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errores.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="reg-calle">Dirección de entrega (opcional)</Form.Label>
                <Form.Control
                  id="reg-calle"
                  type="text"
                  placeholder="Ej: Av. Providencia 1234"
                  value={formData.calle}
                  onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                />
              </Form.Group>

              <Button type="submit" variant="success" size="lg" className="w-100 fw-bold mb-3" disabled={saving}>
                {saving ? 'Creando cuenta...' : 'Crear Mi Cuenta'}
              </Button>
            </Form>

            <div className="text-center border-top pt-3">
              <small className="text-muted">¿Ya tienes una cuenta?</small>{' '}
              <Link to="/login" className="text-success fw-bold text-decoration-none">
                Inicia sesión aquí
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
