import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setEnviado(true);
    setFormData({ nombre: '', correo: '', asunto: '', mensaje: '' });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-5">
            <h1 className="fw-bold text-success">Contáctanos</h1>
            <p className="lead text-secondary">¿Tienes preguntas o deseas consultar por pedidos al por mayor?</p>
          </div>

          {enviado && (
            <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
              <i className="bi bi-check-circle me-2"></i>
              Mensaje enviado con éxito. Nuestro equipo te responderá a la brevedad.
            </Alert>
          )}

          <Card className="border-0 shadow-sm p-4">
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Nombre Completo *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Correo Electrónico *</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="text-end">
                  <Button variant="success" type="submit" size="lg" className="px-4">
                    Enviar Mensaje
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
