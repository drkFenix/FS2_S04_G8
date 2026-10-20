import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SuccessPurchase from './pages/SuccessPurchase';
import FailedPurchase from './pages/FailedPurchase';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <NavigationBar />
          <main className="flex-grow-1">
            <Routes>
              {/* Rutas publicas de la tienda */}
              <Route path="/" element={<Home />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/compra-exitosa" element={<SuccessPurchase />} />
              <Route path="/compra-fallida" element={<FailedPurchase />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />

              {/* Modulo de administracion */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/productos" element={<AdminProducts />} />
              <Route path="/admin/ordenes" element={<AdminOrders />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
