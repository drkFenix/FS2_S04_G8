import React from 'react';
import './index.css'; // Tu CSS global
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from './components/ProductCard'

function App() {
  const productosFrutas = [
    { id: 1, nombre: 'Manzanas Fuji', precio: '1,200 CLP', stock: '150 kilos', descripcion: 'Manzanas Fuji crujientes y dulces del Valle del Maule.', imagen: '/assets/manzanas.jpg' },
    { id: 2, nombre: 'Naranjas Valencia', precio: '1,000 CLP', stock: '200 kilos', descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos.', imagen: '/assets/naranjas.png' },
    { id: 3, nombre: 'Plátanos Cavendish', precio: '800 CLP', stock: '250 kilos', descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno.', imagen: '/assets/platanos.png' }
  ]

  return (
    <>
      <header className="bg-white py-3 px-4 border-bottom shadow-sm d-flex justify-content-between align-items-center">
        <div className="logo d-flex align-items-center gap-3">
          <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '50px' }} />
          <div>
            <h1 className="m-0 fs-4 text-success">HuertoHogar</h1>
            <p className="m-0 text-muted small">Del campo al hogar</p>
          </div>
        </div>
        <nav>
          <ul className="nav gap-3 list-unstyled m-0">
            <li><a href="/" className="text-dark text-decoration-none fw-semibold">Inicio</a></li>
            <li><a href="/login" className="text-dark text-decoration-none fw-semibold">Iniciar Sesión</a></li>
            <li><a href="/registro" className="text-dark text-decoration-none fw-semibold">Registro</a></li>
          </ul>
        </nav>
      </header>

      <main className="container my-5">
        <section className="hero text-center p-5 bg-white rounded shadow-sm mb-5">
          <h2>Descubre la frescura del campo</h2>
          <p className="text-muted">Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.</p>
        </section>

        <section className="catalogo">
          <h2 className="mb-4 text-secondary">Frutas Frescas</h2>
          <Row className="g-4">
            {productosFrutas.map((producto) => (
              <Col key={producto.id} xs={12} md={6} lg={4}>
                <ProductCard 
                  nombre={producto.nombre}
                  precio={producto.precio}
                  stock={producto.stock}
                  descripcion={producto.descripcion}
                  imagen={producto.imagen}
                />
              </Col>
            ))}
          </Row>
        </section>
      </main>

      <footer className="text-white text-center py-4 mt-5" style={{ backgroundColor: '#8B4513' }}>
        <p className="m-0">&copy; 2024 HuertoHogar. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App