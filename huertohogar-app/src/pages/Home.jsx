import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../data/db';

function Home() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const categorias = [
    { nombre: 'Frutas Frescas', img: '/assets/manzanas.jpg', desc: 'Directas del Maule y valles centrales.' },
    { nombre: 'Verduras Orgánicas', img: '/assets/zanahorias.jpg', desc: 'Cultivadas sin pesticidas con sabor auténtico.' },
    { nombre: 'Productos Orgánicos', img: '/assets/miel.jpg', desc: 'Miel pura, quinua y superalimentos.' },
    { nombre: 'Productos Lácteos', img: '/assets/leche.jpg', desc: 'De granjas locales y pastoreo natural.' }
  ];

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const ofertas = productos.filter((p) => p.enOferta);

  return (
    <div>
            <section className="bg-light py-5 border-bottom">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-bold mb-3">
                🌱 100% Fresco y Natural
              </span>
              <h1 className="display-4 fw-bold text-success mb-3">
                Descubre la frescura del campo en tu hogar
              </h1>
              <p className="lead text-secondary mb-4">
                Conéctate con la naturaleza y lleva los mejores alimentos cultivados por agricultores locales directo a tu mesa.
              </p>
              
                            <InputGroup size="lg" className="shadow-sm mb-3">
                <Form.Control
                  placeholder="Buscar frutas, verduras, miel..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <Button variant="success">
                  🔍 Buscar
                </Button>
              </InputGroup>
            </Col>
            <Col lg={5} className="text-center">
              <img
                src="/assets/logo.png"
                alt="HuertoHogar Banner"
                className="img-fluid rounded-4 shadow-sm p-4 bg-white"
                style={{ maxHeight: '280px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

            <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-success">Nuestras Categorías</h2>
            <p className="text-muted">Explora la variedad de alimentos que tenemos para ti y tu familia</p>
          </div>
          <Row className="g-4">
            {categorias.map((cat, idx) => (
              <Col key={idx} xs={12} sm={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm text-center p-3 hover-shadow">
                  <div style={{ height: '140px', overflow: 'hidden' }} className="rounded mb-3">
                    <img
                      src={cat.img}
                      alt={cat.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h5 className="fw-bold text-dark">{cat.nombre}</h5>
                  <p className="text-muted small flex-grow-1">{cat.desc}</p>
                  <Link
                    to={`/categorias?cat=${encodeURIComponent(cat.nombre)}`}
                    className="btn btn-outline-success btn-sm mt-2"
                  >
                    Ver Categoría
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

            {ofertas.length > 0 && !busqueda && (
        <section className="py-5 bg-warning-subtle border-top border-bottom">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold text-dark m-0">🔥 Ofertas Imperdibles</h2>
                <p className="text-muted m-0">Descuentos especiales por tiempo limitado</p>
              </div>
              <Link to="/ofertas" className="btn btn-warning fw-bold">
                Ver todas las ofertas →
              </Link>
            </div>
            <Row className="g-4">
              {ofertas.slice(0, 3).map((producto) => (
                <Col key={producto.id} xs={12} md={4}>
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

            <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-success m-0">
                {busqueda ? `Resultados para "${busqueda}"` : 'Catálogo Completo'}
              </h2>
              <p className="text-muted m-0">
                {productosFiltrados.length} productos disponibles
              </p>
            </div>
            <Link to="/categorias" className="btn btn-outline-success">
              Ver por categorías
            </Link>
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="text-center py-5">
              <h4>No se encontraron productos que coincidan con tu búsqueda.</h4>
              <Button variant="success" onClick={() => setBusqueda('')} className="mt-2">
                Mostrar todos
              </Button>
            </div>
          ) : (
            <Row className="g-4">
              {productosFiltrados.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={4}>
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;
