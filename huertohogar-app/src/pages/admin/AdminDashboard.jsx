import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dashboardService } from '../../services/dashboardService';
import { getErrorMessage } from '../../utils/getErrorMessage';

function AdminDashboard() {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    dashboardService
      .getResumen()
      .then((data) => {
        if (active) setResumen(data);
      })
      .catch((err) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const accesos = [
    {
      titulo: 'Productos',
      desc: 'Inventario, creación, edición, eliminación y control de stock crítico.',
      ruta: '/admin/productos',
      icono: 'bi-box-seam',
    },
    {
      titulo: 'Categorías',
      desc: 'Administración CRUD de categorías del catálogo.',
      ruta: '/admin/categorias',
      icono: 'bi-grid',
    },
    {
      titulo: 'Órdenes y Boletas',
      desc: 'Seguimiento de boletas, detalle y cambio de estado.',
      ruta: '/admin/ordenes',
      icono: 'bi-receipt',
    },
    {
      titulo: 'Usuarios y Roles',
      desc: 'Gestión de cuentas Administrador, Vendedor y Cliente.',
      ruta: '/admin/usuarios',
      icono: 'bi-people',
    },
    {
      titulo: 'Mi Perfil',
      desc: 'Información personal y actualización de cuenta.',
      ruta: '/perfil',
      icono: 'bi-person-circle',
    },
    {
      titulo: 'Ver Tienda',
      desc: 'Vista directa del catálogo público HuertoHogar.',
      ruta: '/',
      icono: 'bi-shop',
    },
  ];

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold text-dark m-0">Panel Administrativo</h1>
          <p className="text-muted m-0">Métricas reales conectadas a Spring Boot y MySQL</p>
        </div>
        <Link to="/" className="btn btn-outline-success">
          <i className="bi bi-shop me-1"></i> Ver Tienda
        </Link>
      </div>

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : resumen ? (
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="border-0 shadow-sm text-white bg-primary p-3">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-white-50 text-uppercase fw-semibold small">Total Ventas</span>
                  <h2 className="fw-bold my-1">${resumen.totalVentas.toLocaleString('es-CL')}</h2>
                  <small className="text-white-50">
                    {resumen.ordenesCompletadas} completadas de {resumen.totalOrdenes} órdenes
                  </small>
                </div>
                <i className="bi bi-cash-coin display-5 opacity-75"></i>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm text-white bg-success p-3">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-white-50 text-uppercase fw-semibold small">Productos Activos</span>
                  <h2 className="fw-bold my-1">{resumen.productosActivos}</h2>
                  <small className="text-white-50">
                    {resumen.stockCritico > 0 ? `${resumen.stockCritico} en stock crítico (≤ 50)` : 'Inventario saludable'}
                  </small>
                </div>
                <i className="bi bi-boxes display-5 opacity-75"></i>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="border-0 shadow-sm text-white bg-dark p-3">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-white-50 text-uppercase fw-semibold small">Usuarios Registrados</span>
                  <h2 className="fw-bold my-1">{resumen.totalUsuarios}</h2>
                  <small className="text-white-50">{resumen.clientesRegistrados} clientes en BD</small>
                </div>
                <i className="bi bi-people display-5 opacity-75"></i>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null}

      <h3 className="fw-bold text-secondary mb-4">Módulos del Sistema</h3>
      <Row className="g-4">
        {accesos.map((item) => (
          <Col key={item.titulo} xs={12} sm={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3 hover-shadow">
              <i className={`bi ${item.icono} fs-1 text-success mb-2`}></i>
              <h5 className="fw-bold text-dark">{item.titulo}</h5>
              <p className="text-muted small flex-grow-1">{item.desc}</p>
              <Link to={item.ruta} className="btn btn-outline-primary btn-sm mt-2">
                Acceder
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;
