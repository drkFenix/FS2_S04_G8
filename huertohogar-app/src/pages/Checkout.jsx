import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { getErrorMessage } from '../utils/getErrorMessage';

const REGIONES_CHILE = [
  'Región Metropolitana de Santiago',
  'Región de Valparaíso',
  'Región del Biobío',
  'Región de Los Lagos',
  'Región de La Araucanía',
  'Región del Maule',
];

const COMUNAS_POR_REGION = {
  'Región Metropolitana de Santiago': [
    'Santiago Centro',
    'Cerrillos',
    'Providencia',
    'Las Condes',
    'Maipú',
    'Ñuñoa',
    'La Florida',
  ],
  'Región de Valparaíso': ['Viña del Mar', 'Valparaíso', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Nacimiento'],
  'Región de Los Lagos': ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Castro'],
  'Región de La Araucanía': ['Temuco', 'Villarrica', 'Pucón'],
  'Región del Maule': ['Talca', 'Curicó', 'Linares'],
};

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago Centro',
    indicaciones: '',
  });

  const [simularError, setSimularError] = useState(false);
  const [errores, setErrores] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Autocompletar solo cuando existe una sesion real iniciada
  useEffect(() => {
    if (isAuthenticated && user) {
      const regionValida = REGIONES_CHILE.includes(user.region)
        ? user.region
        : 'Región Metropolitana de Santiago';
      const comunas = COMUNAS_POR_REGION[regionValida] || [];
      const comunaValida = comunas.includes(user.comuna) ? user.comuna : comunas[0] || '';

      setFormData((prev) => ({
        ...prev,
        nombre: user.nombre || prev.nombre,
        apellidos: user.apellidos || prev.apellidos,
        correo: user.correo || prev.correo,
        calle: user.calle || prev.calle,
        departamento: user.departamento || prev.departamento,
        region: regionValida,
        comuna: comunaValida,
      }));
    }
  }, [isAuthenticated, user]);

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
      ...(name === 'region' && { comuna: COMUNAS_POR_REGION[value]?.[0] || '' }),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validarFormulario();
    setErrores(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setApiError('');
    try {
      const ordenCreada = await orderService.create({
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        correo: formData.correo.trim(),
        calle: formData.calle.trim(),
        departamento: formData.departamento.trim(),
        region: formData.region,
        comuna: formData.comuna,
        indicaciones: formData.indicaciones.trim(),
        simularRechazo: simularError,
        items: cart.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
        })),
      });

      if (ordenCreada.estado === 'RECHAZADA') {
        navigate('/compra-fallida', { state: { orden: ordenCreada } });
      } else {
        clearCart();
        navigate('/compra-exitosa', { state: { orden: ordenCreada } });
      }
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h1 className="fw-bold text-success m-0">Finalizar Compra</h1>
              {isAuthenticated && (
                <small className="text-muted">
                  Datos precargados automáticamente desde tu sesión ({user.correo})
                </small>
              )}
            </div>
            <div className="bg-primary text-white px-4 py-2 rounded shadow-sm fw-bold fs-5">
              Total: ${cartTotal.toLocaleString('es-CL')} CLP
            </div>
          </div>

          {apiError && (
            <Alert variant="danger" role="alert" className="mb-4">
              {apiError}
            </Alert>
          )}

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

          <Form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-light fw-bold">Información del Cliente</Card.Header>
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label htmlFor="chk-nombre">Nombre *</Form.Label>
                      <Form.Control
                        id="chk-nombre"
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
                      <Form.Label htmlFor="chk-apellidos">Apellidos *</Form.Label>
                      <Form.Control
                        id="chk-apellidos"
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
                      <Form.Label htmlFor="chk-correo">Correo Electrónico *</Form.Label>
                      <Form.Control
                        id="chk-correo"
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
              <Card.Header className="bg-light fw-bold">Dirección de Entrega</Card.Header>
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label htmlFor="chk-calle">Calle y Número *</Form.Label>
                      <Form.Control
                        id="chk-calle"
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
                      <Form.Label htmlFor="chk-depto">Depto / Casa (opcional)</Form.Label>
                      <Form.Control
                        id="chk-depto"
                        type="text"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label htmlFor="chk-region">Región *</Form.Label>
                      <Form.Select id="chk-region" name="region" value={formData.region} onChange={handleChange}>
                        {REGIONES_CHILE.map((reg) => (
                          <option key={reg} value={reg}>
                            {reg}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label htmlFor="chk-comuna">Comuna *</Form.Label>
                      <Form.Select id="chk-comuna" name="comuna" value={formData.comuna} onChange={handleChange}>
                        {(COMUNAS_POR_REGION[formData.region] || []).map((com) => (
                          <option key={com} value={com}>
                            {com}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label htmlFor="chk-indicaciones">Indicaciones para la entrega (opcional)</Form.Label>
                      <Form.Control
                        id="chk-indicaciones"
                        as="textarea"
                        rows={2}
                        name="indicaciones"
                        value={formData.indicaciones}
                        onChange={handleChange}
                        placeholder="Ej: Dejar en conserjería si no hay nadie..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

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
              disabled={submitting}
            >
              {submitting
                ? 'Procesando orden en el servidor...'
                : simularError
                  ? 'Procesar pago (Simular rechazo)'
                  : `Pagar ahora $${cartTotal.toLocaleString('es-CL')} CLP`}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
