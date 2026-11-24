import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductCard from '../components/ProductCard';
import { CartProvider, useCart } from '../context/CartContext';

function CartCountSpy() {
  const { cartCount, cartTotal } = useCart();
  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{cartTotal}</span>
    </div>
  );
}

describe('Pruebas unitarias reales - ProductCard y CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const productoNormal = {
    id: 2,
    codigo: 'FR002',
    nombre: 'Naranjas Valencia',
    categoria: 'Frutas Frescas',
    precio: 1000,
    stock: 200,
    unidad: 'kilo',
    origen: 'Región de Coquimbo',
    descripcion: 'Jugosas y ricas en vitamina C',
    imagen: '/assets/naranjas.png',
    enOferta: false,
    precioOferta: null,
  };

  const productoOferta = {
    id: 1,
    codigo: 'FR001',
    nombre: 'Manzanas Fuji',
    categoria: 'Frutas Frescas',
    precio: 1200,
    stock: 150,
    unidad: 'kilo',
    origen: 'Valle del Maule',
    descripcion: 'Crujientes y dulces del Valle del Maule',
    imagen: '/assets/manzanas.jpg',
    enOferta: true,
    precioOferta: 990,
  };

  it('renderiza datos reales del producto y oculta badge de oferta cuando enOferta es false', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard producto={productoNormal} />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText('Naranjas Valencia')).toBeInTheDocument();
    expect(screen.getByText('Frutas Frescas')).toBeInTheDocument();
    expect(screen.queryByText(/OFERTA/i)).not.toBeInTheDocument();
  });

  it('muestra badge de oferta y precio rebajado solo cuando enOferta es true', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard producto={productoOferta} />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText(/OFERTA/i)).toBeInTheDocument();
    expect(screen.getByText(/\$990 CLP/)).toBeInTheDocument();
  });

  it('actualiza estado de cantidad y agrega al carrito aplicando precio de oferta al hacer clic', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard producto={productoOferta} />
          <CartCountSpy />
        </MemoryRouter>
      </CartProvider>
    );

    const inputCant = screen.getByRole('spinbutton');
    fireEvent.change(inputCant, { target: { value: '3' } });
    expect(inputCant.value).toBe('3');

    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2970');
    expect(screen.getByRole('alert')).toHaveTextContent(/Agregaste 3 Manzanas Fuji/);
  });

  it('muestra badge Agotado y oculta botón Agregar cuando stock es 0', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <ProductCard producto={{ ...productoNormal, stock: 0 }} />
        </MemoryRouter>
      </CartProvider>
    );

    expect(screen.getByText('Agotado')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Agregar/i })).not.toBeInTheDocument();
  });
});
