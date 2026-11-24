import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { cartCount, cartTotal } = useCart();
  const { user, role, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const isAdmin = role === 'ADMIN';
  const isVendedor = role === 'VENDEDOR';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="white" expand="lg" className="border-bottom shadow-sm sticky-top py-2">
      <Container fluid className="px-lg-4">
        <Link
          to={isVendedor ? '/vendedor/productos' : '/'}
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
        >
          <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '48px' }} />
          <div>
            <h1 className="m-0 fs-4 text-success fw-bold">HuertoHogar</h1>
            <p className="m-0 text-muted small" style={{ fontSize: '0.75rem' }}>
              Del campo al hogar
            </p>
          </div>
        </Link>

        <BsNavbar.Toggle aria-controls="navbar-huertohogar" />

        <BsNavbar.Collapse id="navbar-huertohogar">
          {isVendedor ? (
            /* Vista estricta del Vendedor: solo productos y ordenes */
            <Nav className="me-auto ms-lg-4 gap-2">
              <Link to="/vendedor/productos" className="nav-link fw-semibold text-dark">
                <i className="bi bi-box-seam me-1"></i> Productos
              </Link>
              <Link to="/vendedor/ordenes" className="nav-link fw-semibold text-dark">
                <i className="bi bi-receipt me-1"></i> Órdenes
              </Link>
            </Nav>
          ) : (
            <Nav className="me-auto ms-lg-4 gap-1">
              <Link to="/" className="nav-link fw-semibold text-dark">
                Inicio
              </Link>
              <Link to="/categorias" className="nav-link fw-semibold text-dark">
                Categorías
              </Link>
              <Link to="/ofertas" className="nav-link fw-semibold text-danger">
                Ofertas
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
              {isAdmin && (
                <Link to="/admin" className="nav-link fw-semibold text-primary text-nowrap">
                  <i className="bi bi-shield-lock me-1"></i> Panel Admin
                </Link>
              )}
            </Nav>
          )}

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {!isVendedor && (
              <Link to="/carrito" className="btn btn-success d-flex align-items-center gap-2 shadow-sm text-nowrap">
                <i className="bi bi-cart3"></i>
                <span>Carrito</span>
                <Badge bg="light" text="dark" className="rounded-pill">
                  {cartCount}
                </Badge>
                <span className="small fw-bold border-start ps-2 border-white-50">
                  ${cartTotal.toLocaleString('es-CL')}
                </span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="d-flex flex-column gap-1" style={{ minWidth: '175px' }}>
                {!isVendedor ? (
                  <Link to="/perfil" className="btn btn-outline-success btn-sm w-100 text-nowrap">
                    <i className="bi bi-person-circle me-1"></i>
                    {user.nombre} ({role})
                  </Link>
                ) : (
                  <span className="badge bg-info-subtle text-dark border px-3 py-2 w-100 text-nowrap">
                    <i className="bi bi-person-badge me-1"></i>
                    {user.nombre} (VENDEDOR)
                  </span>
                )}
                <Button variant="outline-danger" size="sm" className="w-100 text-nowrap" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-secondary btn-sm">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn btn-primary btn-sm">
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default NavigationBar;
