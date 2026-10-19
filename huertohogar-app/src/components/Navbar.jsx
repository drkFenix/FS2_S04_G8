import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function NavigationBar() {
  const { cartCount, cartTotal } = useCart();
  const location = useLocation();

  const esAdmin = location.pathname.startsWith('/admin');

  return (
    <BsNavbar bg="white" expand="lg" className="border-bottom shadow-sm sticky-top py-2">
      <Container fluid className="px-lg-4">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '48px' }} />
          <div>
            <h1 className="m-0 fs-4 text-success fw-bold">HuertoHogar</h1>
            <p className="m-0 text-muted small" style={{ fontSize: '0.75rem' }}>Del campo al hogar</p>
          </div>
        </Link>

        <BsNavbar.Toggle aria-controls="navbar-huertohogar" />

        <BsNavbar.Collapse id="navbar-huertohogar">
          {esAdmin ? (
            <Nav className="me-auto ms-lg-4 gap-2">
              <Link to="/admin" className="nav-link fw-semibold text-secondary">
                📊 Dashboard
              </Link>
              <Link to="/admin/productos" className="nav-link fw-semibold text-secondary">
                📦 Gestión de Productos
              </Link>
              <Link to="/admin/ordenes" className="nav-link fw-semibold text-secondary">
                🧾 Órdenes y Boletas
              </Link>
              <Link to="/" className="nav-link fw-semibold text-success">
                🏪 Ir a la Tienda
              </Link>
            </Nav>
          ) : (
            <Nav className="me-auto ms-lg-4 gap-1">
              <Link to="/" className="nav-link fw-semibold text-dark">
                Home
              </Link>
              <Link to="/categorias" className="nav-link fw-semibold text-dark">
                Categorías
              </Link>
              <Link to="/ofertas" className="nav-link fw-semibold text-danger">
                🔥 Ofertas
              </Link>
              <Link to="/nosotros" className="nav-link fw-semibold text-dark">
                Nosotros
              </Link>
              <Link to="/blog" className="nav-link fw-semibold text-dark">
                Blog
              </Link>
              <Link to="/contacto" className="nav-link fw-semibold text-dark">
                Contacto
              </Link>
              <Link to="/admin" className="nav-link fw-semibold text-primary">
                ⚙️ Admin
              </Link>
            </Nav>
          )}

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {!esAdmin && (
              <Link to="/carrito" className="btn btn-success d-flex align-items-center gap-2 shadow-sm">
                <span>🛒 Carrito</span>
                <Badge bg="light" text="dark" className="rounded-pill">
                  {cartCount}
                </Badge>
                <span className="small fw-bold border-start ps-2 border-white-50">
                  ${cartTotal.toLocaleString('es-CL')}
                </span>
              </Link>
            )}
            <Link to="/login" className="btn btn-outline-secondary btn-sm">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-primary btn-sm">
              Crear Cuenta
            </Link>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default NavigationBar;