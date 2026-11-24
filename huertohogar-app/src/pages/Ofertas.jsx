import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { getErrorMessage } from '../utils/getErrorMessage';

function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    productService
      .list({ enOferta: true })
      .then((data) => {
        if (active) setOfertas(data);
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

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : ofertas.length === 0 ? (
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
