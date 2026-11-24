import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AccesoDenegado() {
  const { role } = useAuth();
  const homePath = role === 'VENDEDOR' ? '/vendedor/productos' : role === 'ADMIN' ? '/admin' : '/';

  return (
    <Container className="py-5 text-center">
      <Card className="border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: '540px' }}>
        <i className="bi bi-shield-exclamation display-3 text-danger mb-3"></i>
        <h2 className="fw-bold text-dark">Acceso Restringido (403)</h2>
        <p className="text-muted mb-4">
          Tu rol actual (<strong>{role || 'Invitado'}</strong>) no tiene permisos para acceder a esta sección.
        </p>
        <Link to={homePath} className="btn btn-success">
          Volver a mi área autorizada
        </Link>
      </Card>
    </Container>
  );
}
