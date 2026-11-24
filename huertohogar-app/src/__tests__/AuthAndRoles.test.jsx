import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import AccesoDenegado from '../pages/AccesoDenegado';
import { getErrorMessage } from '../utils/getErrorMessage';
import { saveAuthSession, getAuthSession, clearAuthSession } from '../utils/authSession';
import { authService } from '../services/authService';

describe('Pruebas reales de Autenticación JWT, Sesión y Control de Roles', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('getErrorMessage prioriza mensaje del backend, timeout y error de red', () => {
    expect(getErrorMessage({ response: { status: 401, data: { message: 'Credenciales invalidas' } } }))
      .toBe('Credenciales invalidas');
    expect(getErrorMessage({ code: 'ECONNABORTED' })).toContain('tardó demasiado');
    expect(getErrorMessage({ response: { status: 502 } })).toBe('Error HTTP 502');
    expect(getErrorMessage({})).toContain('No se pudo contactar a la API');
  });

  it('authSession persiste la sesión en sessionStorage y la limpia al cerrar sesión', () => {
    saveAuthSession({
      accessToken: 'jwt-abc',
      refreshToken: 'ref-xyz',
      expiresIn: 900,
      user: { id: 1, nombre: 'Bryan', correo: 'cliente@huertohogar.cl', rol: 'CLIENTE' },
    });

    const loaded = getAuthSession();
    expect(loaded).not.toBeNull();
    expect(loaded.accessToken).toBe('jwt-abc');
    expect(loaded.user.rol).toBe('CLIENTE');

    clearAuthSession();
    expect(getAuthSession()).toBeNull();
  });

  it('Login muestra alerta de error del backend solo cuando fallan credenciales', async () => {
    vi.spyOn(authService, 'login').mockRejectedValue({
      response: { status: 401, data: { message: 'Correo o contrasena incorrectos' } },
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'mal@huertohogar.cl' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'incorrecta' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Correo o contrasena incorrectos');
    });
  });

  it('ProtectedRoute redirige a /login sin sesión y a /acceso-denegado si el rol no tiene permiso', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<div>Pantalla Login</div>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <div>Solo Admin</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Pantalla Login')).toBeInTheDocument();
    unmount();

    saveAuthSession({
      accessToken: 'tok-cli',
      refreshToken: 'ref-cli',
      expiresIn: 900,
      user: { id: 3, nombre: 'Bryan', correo: 'cliente@huertohogar.cl', rol: 'CLIENTE' },
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <AuthProvider>
          <Routes>
            <Route path="/acceso-denegado" element={<AccesoDenegado />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <div>Solo Admin</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Acceso Restringido/i)).toBeInTheDocument();
  });

  it('Navbar restringe accesos estrictamente según el rol VENDEDOR vs ADMIN', () => {
    saveAuthSession({
      accessToken: 'tok-vend',
      refreshToken: 'ref-vend',
      expiresIn: 900,
      user: { id: 2, nombre: 'Camila', correo: 'vendedor@huertohogar.cl', rol: 'VENDEDOR' },
    });

    const { unmount } = render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <NavigationBar />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Órdenes/i)).toBeInTheDocument();
    expect(screen.queryByText(/Panel Admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Carrito/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Blog/i)).not.toBeInTheDocument();
    unmount();

    saveAuthSession({
      accessToken: 'tok-admin',
      refreshToken: 'ref-admin',
      expiresIn: 900,
      user: { id: 1, nombre: 'Administrador', correo: 'admin@huertohogar.cl', rol: 'ADMIN' },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <NavigationBar />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Panel Admin/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cerrar Sesión/i })).toBeInTheDocument();
  });

  it('Footer oculta enlaces de tienda y admin al VENDEDOR y no expone link Admin al CLIENTE', () => {
    saveAuthSession({
      accessToken: 'tok-vend',
      refreshToken: 'ref-vend',
      expiresIn: 900,
      user: { id: 2, nombre: 'Camila', correo: 'vendedor@huertohogar.cl', rol: 'VENDEDOR' },
    });

    const { unmount } = render(
      <MemoryRouter>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Catálogo de Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Consulta de Órdenes/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ofertas del Mes/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Panel Administrativo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Evaluación 2/i)).not.toBeInTheDocument();
    unmount();

    saveAuthSession({
      accessToken: 'tok-cli',
      refreshToken: 'ref-cli',
      expiresIn: 900,
      user: { id: 3, nombre: 'Bryan', correo: 'cliente@huertohogar.cl', rol: 'CLIENTE' },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Ofertas del Mes/i)).toBeInTheDocument();
    expect(screen.queryByText(/Panel Administrativo/i)).not.toBeInTheDocument();
  });
});
