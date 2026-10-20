import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    if (correo.includes('admin')) {
      alert('¡Bienvenido Administrador a HuertoHogar!');
      navigate('/admin');
    } else {
      alert(`¡Sesión iniciada con éxito! Bienvenido ${correo}`);
      navigate('/');
    }
  };

  const handleAccesoRapidoAdmin = () => {
    setCorreo('admin@huertohogar.cl');
    setPassword('admin1234');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '60px' }} className="mb-2" />
              <h2 className="fw-bold text-success">Iniciar Sesión</h2>
              <p className="text-muted small">Accede a tu cuenta de cliente o administración</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" size="lg" className="w-100 fw-bold mb-3">
                Ingresar
              </Button>
            </Form>

            <div className="text-center border-top pt-3">
              <small className="text-muted d-block mb-2">¿No tienes cuenta aún?</small>
              <Link to="/registro" className="btn btn-outline-secondary btn-sm w-100 mb-3">
                Registrarse como nuevo cliente
              </Link>

              <Button variant="link" size="sm" className="text-decoration-none" onClick={handleAccesoRapidoAdmin}>
                ⚡ Autocompletar como Administrador
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
