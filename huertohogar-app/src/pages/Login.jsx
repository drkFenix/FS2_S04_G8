import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';

function Login() {
  const { isAuthenticated, role, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const destinoPorRol = (rol) => {
    if (rol === 'ADMIN') return '/admin';
    if (rol === 'VENDEDOR') return '/vendedor/productos';
    return location.state?.from && !location.state.from.startsWith('/admin') && !location.state.from.startsWith('/vendedor')
      ? location.state.from
      : '/';
  };

  if (isAuthenticated) {
    return <Navigate to={destinoPorRol(role)} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const session = await login(correo.trim(), password);
      navigate(destinoPorRol(session.user.rol), { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="border-0 shadow-sm p-4">
            <div className="text-center mb-4">
              <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '60px' }} className="mb-2" />
              <h2 className="fw-bold text-success">Iniciar Sesión</h2>
              <p className="text-muted small">Autenticación segura con JWT y control por roles</p>
            </div>

            {error && (
              <Alert variant="danger" role="alert">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="login-correo">Correo Electrónico</Form.Label>
                <Form.Control
                  id="login-correo"
                  type="email"
                  autoComplete="username"
                  placeholder="ejemplo@huertohogar.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="login-password">Contraseña</Form.Label>
                <Form.Control
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" size="lg" className="w-100 fw-bold mb-3" disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </Form>

            <div className="text-center border-top pt-3">
              <small className="text-muted d-block mb-2">¿No tienes cuenta aún?</small>
              <Link to="/registro" className="btn btn-outline-secondary btn-sm w-100">
                Registrarse como nuevo cliente
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
