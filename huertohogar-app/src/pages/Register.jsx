import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });
  const [errores, setErrores] = useState({});

  const validar = () => {
    const err = {};
    if (!formData.nombre.trim() || formData.nombre.trim().length < 3) {
      err.nombre = 'El nombre debe tener al menos 3 caracteres.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const valErr = validar();
    if (Object.keys(valErr).length > 0) {
      setErrores(valErr);
      return;
    }

    alert('¡Registro exitoso en HuertoHogar! Ya puedes iniciar sesión con tu cuenta.');
    navigate('/login');
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

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Completo *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Bryan Rodriguez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  isInvalid={!!errores.nombre}
                />
                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  isInvalid={!!errores.correo}
                />
                <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña (mínimo 8 caracteres) *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  isInvalid={!!errores.password}
                />
                <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirmar Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  isInvalid={!!errores.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errores.confirmPassword}</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant="success" size="lg" className="w-100 fw-bold mb-3">
                Crear Mi Cuenta
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
