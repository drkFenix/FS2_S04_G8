import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { crearOrden } from '../data/db';

const REGIONES_CHILE = [
  'Región Metropolitana de Santiago',
  'Región de Valparaíso',
  'Región del Biobío',
  'Región de Los Lagos',
  'Región de La Araucanía',
  'Región del Maule'
];

const COMUNAS_POR_REGION = {
  'Región Metropolitana de Santiago': ['Santiago Centro', 'Cerrillos', 'Providencia', 'Las Condes', 'Maipú', 'Ñuñoa', 'La Florida'],
  'Región de Valparaíso': ['Viña del Mar', 'Valparaíso', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Nacimiento'],
  'Región de Los Lagos': ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Castro'],
  'Región de La Araucanía': ['Temuco', 'Villarrica', 'Pucón'],
  'Región del Maule': ['Talca', 'Curicó', 'Linares']
};

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: 'Pedro',
    apellidos: 'Hacker',
    correo: 'pedro.hacker20@example.com',
    calle: 'Los Crisantemos, Edificio Norte',
    departamento: 'Depto 603',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
  });

  const [simularError, setSimularError] = useState(false);
  const [errores, setErrores] = useState({});

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>No hay productos en el carrito para procesar</h2>
        <Button variant="success" onClick={() => navigate('/categorias')} className="mt-3">
          Ir al Catálogo
        </Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'region' && { comuna: COMUNAS_POR_REGION[value]?.[0] || '' })
    }));
  };

  const validarFormulario = () => {
    const err = {};
    if (!formData.nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (!formData.apellidos.trim()) err.apellidos = 'Los apellidos son obligatorios';
    if (!formData.correo.trim() || !formData.correo.includes('@')) err.correo = 'Correo electrónico inválido';
    if (!formData.calle.trim()) err.calle = 'La dirección de entrega es obligatoria';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario();
    if (Object.keys(validationErrors).length > 0) {
      setErrores(validationErrors);
      return;
    }

    if (simularError) {
      const ordenFallida = crearOrden({
        cliente: formData,
        items: cart,
        total: cartTotal,
        estado: 'fallida'
      });
      navigate('/compra-fallida', { state: { orden: ordenFallida } });
    } else {
      const ordenExitosa = crearOrden({
        cliente: formData,
        items: cart,
        total: cartTotal,
        estado: 'completada'
      });
      clearCart();
      navigate('/compra-exitosa', { state: { orden: ordenExitosa } });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold text-success m-0">Finalizar Compra</h1>
            <div className="bg-primary text-white px-4 py-2 rounded shadow-sm fw-bold fs-5">
              Total: ${cartTotal.toLocaleString('es-CL')} CLP
            </div>
          </div>

          {/* Resumen del pedido */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-light fw-bold">Resumen de productos</Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="m-0 text-center align-middle">
                <thead>
                  <tr className="text-secondary small">
                    <th>Imagen</th>
                    <th className="text-start">Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td className="text-start fw-bold">{item.nombre}</td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>{item.cantidad}</td>
                      <td className="fw-bold text-success">${item.subtotal.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Formulario de cliente y despacho */}
          <Form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-light fw-bold">
                Información del Cliente
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        isInvalid={!!errores.nombre}
                      />
                      <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Apellidos *</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        isInvalid={!!errores.apellidos}
                      />
                      <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Correo Electrónico *</Form.Label>
                      <Form.Control
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        isInvalid={!!errores.correo}
                      />
                      <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-light fw-bold">
                Dirección de Entrega
              </Card.Header>
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>Calle y Número *</Form.Label>
                      <Form.Control
                        type="text"
                        name="calle"
                        value={formData.calle}
                        onChange={handleChange}
                        isInvalid={!!errores.calle}
                      />
                      <Form.Control.Feedback type="invalid">{errores.calle}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Depto / Casa (opcional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Región *</Form.Label>
                      <Form.Select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        {REGIONES_CHILE.map((reg) => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Comuna *</Form.Label>
                      <Form.Select
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                      >
                        {(COMUNAS_POR_REGION[formData.region] || []).map((com) => (
                          <option key={com} value={com}>{com}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="indicaciones"
                        value={formData.indicaciones}
                        onChange={handleChange}
                        placeholder="Ej: Dejar con conserjería si no hay nadie..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Selector de simulacion de pasarela */}
            <Card className="border-secondary-subtle bg-light mb-4">
              <Card.Body className="py-2 px-3 d-flex justify-content-between align-items-center">
                <span className="small text-muted">
                  <i className="bi bi-credit-card-2-front me-2"></i>
                  <strong>Pasarela Webpay (Sandbox):</strong> Simular respuesta de pago
                </span>
                <Form.Check
                  type="switch"
                  id="switch-simular-error"
                  label={simularError ? 'Simular pago rechazado' : 'Simular pago aprobado'}
                  checked={simularError}
                  onChange={(e) => setSimularError(e.target.checked)}
                  className="small"
                />
              </Card.Body>
            </Card>

            <Button
              type="submit"
              variant={simularError ? 'danger' : 'success'}
              size="lg"
              className="w-100 fw-bold py-3 shadow-sm"
            >
              {simularError ? 'Procesar pago (Simular rechazo)' : `Pagar ahora $${cartTotal.toLocaleString('es-CL')} CLP`}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
