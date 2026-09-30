import React from 'react';
import './index.css'; // Tu CSS global

function App() {
  return (
    <>
      <header>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '60px' }} />
          <div>
            <h1 style={{ margin: 0 }}>HuertoHogar</h1>
            <p style={{ margin: 0 }}>Del campo al hogar</p>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/login">Iniciar Sesión</a></li>
            <li><a href="/registro">Registro</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section className="hero">
          <h2>Descubre la frescura del campo</h2>
          <p>Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.</p>
        </section>
        
        <section className="catalogo">
          <h2>Bienvenido a tu nueva tienda en React</h2>
          <p>Tus estilos de CSS y tus imágenes ya fueron migrados. Ahora debes convertir tus páginas HTML en componentes de React (ej: ProductoCard, Header, Footer).</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 HuertoHogar. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;
