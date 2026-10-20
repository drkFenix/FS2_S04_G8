import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../data/db';

const CATEGORIAS_LISTA = [
  'Todas',
  'Frutas Frescas',
  'Verduras Orgánicas',
  'Productos Orgánicos',
  'Productos Lácteos'
];

function Categorias() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaURL = searchParams.get('cat') || 'Todas';
  const [categoriaActiva, setCategoriaActiva] = useState(categoriaURL);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  useEffect(() => {
    if (categoriaURL && CATEGORIAS_LISTA.includes(categoriaURL)) {
      setCategoriaActiva(categoriaURL);
    }
  }, [categoriaURL]);

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

            <Nav variant="pills" className="justify-content-center gap-2 mb-5 flex-wrap">
        {CATEGORIAS_LISTA.map((cat) => (
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

            <div className="mb-4 d-flex justify-content-between align-items-center">
        <h3 className="fw-bold text-secondary m-0">
          {categoriaActiva === 'Todas' ? 'Todos los Productos' : categoriaActiva}
        </h3>
        <span className="text-muted">{productosFiltrados.length} productos</span>
      </div>

      <Row className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} lg={4}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categorias;
