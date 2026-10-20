import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
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
    { titulo: 'Dashboard', desc: 'Métricas generales y estadísticas clave del sistema.', ruta: '/admin', icono: 'bi-speedometer2' },
    { titulo: 'Órdenes', desc: 'Gestión y seguimiento de todas las compras realizadas.', ruta: '/admin/ordenes', icono: 'bi-receipt' },
    { titulo: 'Productos', desc: 'Inventario, creación, edición y control de stock crítico.', ruta: '/admin/productos', icono: 'bi-box-seam' },
    { titulo: 'Categorías', desc: 'Catálogo de categorías para organizar los productos.', ruta: '/categorias', icono: 'bi-grid' },
    { titulo: 'Usuarios', desc: 'Cuentas de usuario registradas y permisos.', ruta: '#', icono: 'bi-people' },
    { titulo: 'Reportes', desc: 'Reportes de ventas y desempeño del catálogo.', ruta: '#', icono: 'bi-graph-up' },
    { titulo: 'Perfil', desc: 'Información y configuración de cuenta.', ruta: '#', icono: 'bi-person-circle' },
    { titulo: 'Tienda', desc: 'Vista directa de la tienda pública.', ruta: '/', icono: 'bi-shop' }
  ];

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold text-dark m-0">Panel Administrativo</h1>
          <p className="text-muted m-0">Resumen general y métricas de HuertoHogar</p>
        </div>
        <Link to="/" className="btn btn-outline-success">
          <i className="bi bi-shop me-1"></i> Ver Tienda
        </Link>
      </div>

      {/* Tarjetas de metricas principales */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="border-0 shadow-sm text-white bg-primary p-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white-50 text-uppercase fw-semibold small">Total Ventas</span>
                <h2 className="fw-bold my-1">${totalVentas.toLocaleString('es-CL')}</h2>
                <small className="text-white-50">{ordenes.length} órdenes registradas</small>
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
                <h2 className="fw-bold my-1">{productos.length}</h2>
                <small className="text-white-50">
                  {stockCriticoCount > 0 ? `${stockCriticoCount} en stock crítico` : 'Inventario normal'}
                </small>
              </div>
              <i className="bi bi-boxes display-5 opacity-75"></i>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="border-0 shadow-sm text-white bg-warning p-3">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white-50 text-uppercase fw-semibold small">Clientes Frecuentes</span>
                <h2 className="fw-bold my-1">128</h2>
                <small className="text-white-50">Clientes en RM y regiones</small>
              </div>
              <i className="bi bi-people display-5 opacity-75"></i>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modulos del sistema */}
      <h3 className="fw-bold text-secondary mb-4">Módulos del Sistema</h3>
      <Row className="g-4">
        {accesos.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-3 hover-shadow transition">
              <i className={`bi ${item.icono} fs-1 text-success mb-2`}></i>
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
