import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Nosotros() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Sobre HuertoHogar</h1>
        <p className="lead text-secondary">Del campo a tu mesa, sin intermediarios</p>
      </div>

      <Row className="g-4 mb-5 align-items-center">
        <Col md={6}>
          <h2 className="fw-bold text-dark mb-3">Nuestra Misión</h2>
          <p className="text-secondary">
            En HuertoHogar conectamos a pequeños y medianos productores agrícolas de Chile con las familias en las ciudades. Promovemos el consumo de productos 100% orgánicos, libres de químicos y cultivados con respeto hacia la tierra.
          </p>
          <p className="text-secondary">
            Creemos firmemente en el comercio justo, asegurando precios dignos para nuestros agricultores y alimentos frescos de la más alta calidad para tu hogar.
          </p>
        </Col>
        <Col md={6} className="text-center">
          <img
            src="/assets/logo.png"
            alt="HuertoHogar"
            className="img-fluid p-4 bg-light rounded shadow-sm"
            style={{ maxHeight: '250px' }}
          />
        </Col>
      </Row>

      <Row className="g-4 text-center">
        <Col md={4}>
          <Card className="p-4 border-0 shadow-sm h-100">
            <div className="mb-3">
              <i className="bi bi-flower1 display-5 text-success"></i>
            </div>
            <h5 className="fw-bold text-success">100% Orgánico</h5>
            <p className="text-muted small">Cero pesticidas y cultivado de manera limpia y sustentable.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 border-0 shadow-sm h-100">
            <div className="mb-3">
              <i className="bi bi-truck display-5 text-success"></i>
            </div>
            <h5 className="fw-bold text-success">Despacho Rápido</h5>
            <p className="text-muted small">Entregamos en menos de 24 horas desde la cosecha en origen.</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4 border-0 shadow-sm h-100">
            <div className="mb-3">
              <i className="bi bi-people display-5 text-success"></i>
            </div>
            <h5 className="fw-bold text-success">Comercio Justo</h5>
            <p className="text-muted small">Apoyo directo a agricultores locales sin intermediarios.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;
