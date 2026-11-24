import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Alert, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { getErrorMessage } from '../utils/getErrorMessage';

function Categorias() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaURL = searchParams.get('cat') || 'Todas';
  const [categoriaActiva, setCategoriaActiva] = useState(categoriaURL);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    Promise.all([categoryService.list(), productService.list()])
      .then(([cats, prods]) => {
        if (!active) return;
        setCategorias(cats);
        setProductos(prods);
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

  useEffect(() => {
    setCategoriaActiva(categoriaURL);
  }, [categoriaURL]);

  const nombresCategorias = ['Todas', ...categorias.map((c) => c.nombre)];

  const handleSeleccionarCategoria = (cat) => {
    setCategoriaActiva(cat);
    if (cat === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const productosFiltrados =
    categoriaActiva === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Catálogo por Categorías</h1>
        <p className="text-muted">
          Selecciona una categoría para filtrar nuestros productos agrícolas y orgánicos
        </p>
      </div>

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      <Nav variant="pills" className="justify-content-center gap-2 mb-5 flex-wrap">
        {nombresCategorias.map((cat) => (
          <Nav.Item key={cat}>
            <Nav.Link
              active={categoriaActiva === cat}
              onClick={() => handleSeleccionarCategoria(cat)}
              className={
                categoriaActiva === cat
                  ? 'bg-success text-white px-4 py-2 fw-semibold'
                  : 'bg-light text-dark px-4 py-2 fw-semibold border'
              }
              style={{ cursor: 'pointer' }}
            >
              {cat}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : productosFiltrados.length === 0 ? (
        <Card className="text-center p-5 border-0 shadow-sm">
          <h4>No hay productos disponibles en esta categoría</h4>
        </Card>
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
  );
}

export default Categorias;
