import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

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
import Perfil from './pages/Perfil';
import AccesoDenegado from './pages/AccesoDenegado';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

function StoreOnlyRoute({ children }) {
  const { role } = useAuth();
  if (role === 'VENDEDOR') {
    return <Navigate to="/vendedor/productos" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavigationBar />
      <main className="flex-grow-1">
        <Routes>
          {/* Tienda publica (restringida si la sesion activa es VENDEDOR) */}
          <Route path="/" element={<StoreOnlyRoute><Home /></StoreOnlyRoute>} />
          <Route path="/categorias" element={<StoreOnlyRoute><Categorias /></StoreOnlyRoute>} />
          <Route path="/ofertas" element={<StoreOnlyRoute><Ofertas /></StoreOnlyRoute>} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<StoreOnlyRoute><Cart /></StoreOnlyRoute>} />
          <Route path="/checkout" element={<StoreOnlyRoute><Checkout /></StoreOnlyRoute>} />
          <Route path="/compra-exitosa" element={<StoreOnlyRoute><SuccessPurchase /></StoreOnlyRoute>} />
          <Route path="/compra-fallida" element={<StoreOnlyRoute><FailedPurchase /></StoreOnlyRoute>} />
          <Route path="/nosotros" element={<StoreOnlyRoute><Nosotros /></StoreOnlyRoute>} />
          <Route path="/blog" element={<StoreOnlyRoute><Blog /></StoreOnlyRoute>} />
          <Route path="/contacto" element={<StoreOnlyRoute><Contacto /></StoreOnlyRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<StoreOnlyRoute><Register /></StoreOnlyRoute>} />
          <Route path="/acceso-denegado" element={<AccesoDenegado />} />

          {/* Perfil autenticado (Cliente y Admin) */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'ADMIN']}>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* Modulo Vendedor (solo visualizacion de productos y ordenes) */}
          <Route
            path="/vendedor/productos"
            element={
              <ProtectedRoute allowedRoles={['VENDEDOR', 'ADMIN']}>
                <AdminProducts readOnly />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendedor/ordenes"
            element={
              <ProtectedRoute allowedRoles={['VENDEDOR', 'ADMIN']}>
                <AdminOrders readOnly />
              </ProtectedRoute>
            }
          />

          {/* Modulo Administrador (acceso total exclusivo ADMIN) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categorias"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ordenes"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <Container className="py-5 text-center">
                <h2>Página no encontrada (404)</h2>
                <Link to="/" className="btn btn-success mt-3">
                  Volver al Inicio
                </Link>
              </Container>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
