function Navbar({ cartCount }) {
  return (
    <header className="bg-white py-3 px-4 border-bottom shadow-sm d-flex justify-content-between align-items-center">
      <div className="logo d-flex align-items-center gap-3">
        <img src="/assets/logo.png" alt="Logo HuertoHogar" style={{ height: '50px' }} />
        <div>
          <h1 className="m-0 fs-4 text-success">HuertoHogar</h1>
          <p className="m-0 text-muted small">Del campo al hogar</p>
        </div>
      </div>
      <nav className="d-flex align-items-center gap-4">
        <ul className="nav gap-3 list-unstyled m-0 align-items-center">
          <li><a href="/" className="text-dark text-decoration-none fw-semibold">Inicio</a></li>
          <li><a href="/login" className="text-dark text-decoration-none fw-semibold">Iniciar Sesión</a></li>
          <li><a href="/registro" className="text-dark text-decoration-none fw-semibold">Registro</a></li>
        </ul>
        <div className="bg-success text-white px-3 py-1 rounded-pill fw-bold small">
          🛒 Carrito: {cartCount}
        </div>
      </nav>
    </header>
  )
}

export default Navbar