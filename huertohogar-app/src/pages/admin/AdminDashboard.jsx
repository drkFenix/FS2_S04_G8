import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { obtenerProductos, obtenerOrdenes } from '../../data/db';

function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
    setOrdenes(obtenerOrdenes());
  }, []);

  const totalVentas = ordenes
    .filter((o) => o.estado === 'completada')
    .reduce((sum, o) => sum + o.total, 0);

  const stockCriticoCount = productos.filter((p) => p.stock > 0 && p.stock <= 50).length;

  const accesos = [
    { titulo: 'Dashboard', desc: 'Visión general de todas las métricas y estadísticas clave del sistema.', ruta: '/admin', icono: '📊' },
    { titulo: 'Órdenes', desc: 'Gestión y seguimiento de todas las órdenes de compra realizadas.', ruta: '/admin/ordenes', icono: '🧾' },
    { titulo: 'Productos', desc: 'Administrar inventario, nuevos productos y stock crítico.', ruta: '/admin/productos', icono: '📦' },
    { titulo: 'Categorías', desc: 'Organizar productos en categorías para facilitar su navegación.', ruta: '/categorias', icono: '🗂️' },
    { titulo: 'Usuarios', desc: 'Gestión de cuentas de usuario y sus roles dentro del sistema.', ruta: '#', icono: '👥' },
    { titulo: 'Reportes', desc: 'Generación de informes detallados sobre las operaciones del sistema.', ruta: '#', icono: '📈' },
    { titulo: 'Perfil', desc: 'Administración de la información personal y configuraciones de cuenta.', ruta: '#', icono: '👤' },
    { titulo: 'Tienda', desc: 'Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios.', ruta: '/', icono: '🏪' }
  ];

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark m-0">Panel Administrativo</h1>
          <p className="text-muted m-0">Resumen general de las actividades de HuertoHogar</p>
        </div>
        <Link to="/" className="btn btn-outline-success">
          🏪 Ver Tienda Pública
        </Link>
      </div>

            <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="border-0 shadow-sm text-white bg-primary p-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white-50 text-uppercase fw-semibold small">Total Ventas</span>
                <h2 className="fw-bold my-1">${totalVentas.toLocaleString('es-CL')}</h2>
                <small className="text-white-50">{ordenes.length} órdenes registradas</small>
              </div>
              <div className="display-4">🛒</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm text-white bg-success p-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white-50 text-uppercase fw-semibold small">Productos Activos</span>
                <h2 className="fw-bold my-1">{productos.length}</h2>
                <small className="text-white-50">
                  {stockCriticoCount > 0 ? `⚠️ ${stockCriticoCount} en stock crítico` : 'Inventario estable'}
                </small>
              </div>
              <div className="display-4">📦</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm text-white bg-warning p-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white-50 text-uppercase fw-semibold small">Clientes Frecuentes</span>
                <h2 className="fw-bold my-1">128</h2>
                <small className="text-white-50">Comunidades de Santiago y regiones</small>
              </div>
              <div className="display-4">👥</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

            <h3 className="fw-bold text-secondary mb-4">Módulos del Sistema</h3>
      <Row className="g-4">
        {accesos.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-3 hover-shadow transition">
              <div className="fs-1 mb-2">{item.icono}</div>
              <h5 className="fw-bold text-dark">{item.titulo}</h5>
              <p className="text-muted small flex-grow-1">{item.desc}</p>
              {item.ruta !== '#' ? (
                <Link to={item.ruta} className="btn btn-outline-primary btn-sm mt-2">
                  Acceder
                </Link>
              ) : (
                <span className="badge bg-secondary-subtle text-secondary py-1 mt-2">Próximamente</span>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminDashboard;
