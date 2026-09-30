import { Card, Button } from 'react-bootstrap'

function ProductCard({ nombre, precio, stock, imagen, descripcion }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ color: '#2E8B57' }}>{nombre}</Card.Title>
        <Card.Text className="precio fw-bold">Precio: ${precio}</Card.Text>
        <Card.Text className="stock text-muted" style={{ fontSize: '0.85rem' }}>Stock: {stock}</Card.Text>
        <Card.Text className="descripcion" style={{ fontSize: '0.9rem' }}>{descripcion}</Card.Text>
        <Button variant="success" className="mt-auto">Agregar al carrito</Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard  