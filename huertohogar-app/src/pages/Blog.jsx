import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const ARTICULOS_BLOG = [
  {
    id: 1,
    titulo: 'Beneficios de las Manzanas Fuji para la salud digestiva',
    fecha: '18 de Octubre, 2026',
    autor: 'Nutrición HuertoHogar',
    resumen: 'Descubre por qué una manzana al día puede transformar tu energía, gracias a la pectina y fibra natural.',
    contenido: 'Las manzanas Fuji no solo destacan por su sabor dulce y textura crujiente, sino también por ser una extraordinaria fuente de antioxidantes y quercetina. Consumirlas con cáscara bien lavada aporta pectina soluble que mejora el tránsito intestinal y ayuda a regular los niveles de colesterol en la sangre.',
    imagen: '/assets/manzanas.jpg'
  },
  {
    id: 2,
    titulo: 'Cómo incorporar verduras orgánicas en la dieta infantil',
    fecha: '12 de Octubre, 2026',
    autor: 'Chef Paulina Rivas',
    resumen: 'Recetas creativas para que los más pequeños disfruten de zanahorias y espinacas sin quejas.',
    contenido: 'Hacer que los niños consuman verduras no tiene por qué ser una batalla. Al utilizar verduras frescas orgánicas libres de pesticidas, el sabor natural es más dulce y agradable. Prueba preparar muffins de zanahoria con avena o panqueques verdes con espinaca licuada.',
    imagen: '/assets/zanahorias.jpg'
  }
];

function Blog() {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-success">Blog & Vida Sana</h1>
        <p className="lead text-secondary">Consejos, recetas e información sobre alimentación consciente</p>
      </div>

      <Row className="g-4">
        {ARTICULOS_BLOG.map((art) => (
          <Col key={art.id} md={6}>
            <Card className="h-100 border-0 shadow-sm overflow-hidden">
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={art.imagen}
                  alt={art.titulo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="p-4 d-flex flex-column">
                <small className="text-muted mb-2">{art.fecha} • Por {art.autor}</small>
                <Card.Title className="fw-bold text-dark fs-4 mb-3">{art.titulo}</Card.Title>
                <Card.Text className="text-secondary flex-grow-1">{art.resumen}</Card.Text>
                <Button
                  variant="outline-success"
                  className="mt-3 align-self-start"
                  onClick={() => setArticuloSeleccionado(art)}
                >
                  Leer Artículo Completo →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

            <Modal show={!!articuloSeleccionado} onHide={() => setArticuloSeleccionado(null)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">{articuloSeleccionado?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {articuloSeleccionado && (
            <div>
              <img
                src={articuloSeleccionado.imagen}
                alt={articuloSeleccionado.titulo}
                className="img-fluid rounded mb-3 w-100"
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
              <p className="text-muted small mb-3">
                Publicado el {articuloSeleccionado.fecha} por {articuloSeleccionado.autor}
              </p>
              <p className="lead text-dark">{articuloSeleccionado.contenido}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setArticuloSeleccionado(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Blog;
