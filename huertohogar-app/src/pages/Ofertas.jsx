import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../data/db';

function Ofertas() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const ofertas = productos.filter((p) => p.enOferta);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2 fs-6">
          <i className="bi bi-tag-fill me-1"></i> Descuentos de Temporada
        </span>
        <h1 className="fw-bold text-dark">Productos en Oferta</h1>
        <p className="text-muted">
          Aprovecha los descuentos especiales en productos frescos seleccionados directamente de la cosecha
        </p>
      </div>

      <Alert variant="warning" className="text-center mb-5">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Promoción especial:</strong> Descuentos exclusivos hasta agotar stock disponible.
      </Alert>

      {ofertas.length === 0 ? (
        <div className="text-center py-5">
          <h4>Actualmente no hay ofertas vigentes.</h4>
          <p className="text-muted">Vuelve pronto para conocer nuestras próximas promociones.</p>
        </div>
      ) : (
        <Row className="g-4">
          {ofertas.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} lg={4}>
              <ProductCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Ofertas;
