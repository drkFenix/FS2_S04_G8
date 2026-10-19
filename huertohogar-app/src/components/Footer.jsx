import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white py-5 mt-auto" style={{ backgroundColor: '#2E8B57' }}>
      <Container>
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src="/assets/logo.png" alt="HuertoHogar Logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
              <h5 className="m-0 fw-bold">HuertoHogar</h5>
            </div>
            <p className="small text-white-50">
              Conectando la agricultura local de Chile con tu mesa familiar. Alimentos 100% frescos, sanos y cultivados con amor.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold mb-3">Cobertura de Despachos</h6>
            <p className="small text-white-50">
              Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción.
            </p>
          </Col>
          <Col md={4}>
            <h6 className="fw-bold mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled small text-white-50 d-flex flex-column gap-1">
              <li><Link to="/categorias" className="text-white text-decoration-none">Catálogo por Categorías</Link></li>
              <li><Link to="/ofertas" className="text-white text-decoration-none">Ofertas del Mes</Link></li>
              <li><Link to="/nosotros" className="text-white text-decoration-none">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="text-white text-decoration-none">Atención al Cliente</Link></li>
              <li><Link to="/admin" className="text-white-50 text-decoration-none">Acceso Administrativo</Link></li>
            </ul>
          </Col>
        </Row>
        <div className="border-top border-white-50 pt-3 text-center small text-white-50">
          <p className="m-0">&copy; 2026 HuertoHogar SpA. Desarrollado para Evaluación 2 - Duoc UC.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;