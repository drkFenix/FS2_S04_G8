import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';

// Componente simple para probar props de botón y eventos requeridos en la rúbrica
function BotonAccion({ etiqueta, onClick, deshabilitado }) {
  return (
    <button onClick={onClick} disabled={deshabilitado} className="btn-test">
      {etiqueta}
    </button>
  );
}

// Componente simple de formulario para probar estado (state) y renderizado condicional
function FormularioPrueba() {
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (texto.length < 3) {
      setError('El texto debe tener al menos 3 caracteres.');
    } else {
      setError('');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input
        aria-label="campo-texto"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit">Enviar</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

describe('Evaluación 2 - Pruebas Unitarias de Componentes React (Duoc UC)', () => {
  // ========================================================
  // 1. PRUEBAS DE RENDERIZADO
  // ========================================================
  describe('1. Pruebas de Renderizado', () => {
    it('Renderizado correcto: debe renderizar la información y datos proporcionados del producto', () => {
      const productoPrueba = {
        id: 1,
        nombre: 'Manzanas Fuji',
        categoria: 'Frutas Frescas',
        precio: 1200,
        stock: 150,
        unidad: 'kilo',
        descripcion: 'Crujientes y dulces del Valle del Maule',
        imagen: '/assets/manzanas.jpg',
        enOferta: false
      };

      render(
        <CartProvider>
          <BrowserRouter>
            <ProductCard producto={productoPrueba} />
          </BrowserRouter>
        </CartProvider>
      );

      expect(screen.getByText('Manzanas Fuji')).toBeInTheDocument();
      expect(screen.getByText('Frutas Frescas')).toBeInTheDocument();
      expect(screen.getByText(/Crujientes y dulces/)).toBeInTheDocument();
    });

    it('Renderizado condicional: debe mostrar el mensaje de error SOLO cuando hay un error presente', () => {
      render(<FormularioPrueba />);

      // Al inicio no debe haber mensaje de error
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      // Enviamos el formulario vacío (longitud < 3)
      fireEvent.click(screen.getByText('Enviar'));

      // Ahora sí debe renderizarse el mensaje de error condicional
      const mensajeError = screen.getByRole('alert');
      expect(mensajeError).toBeInTheDocument();
      expect(mensajeError).toHaveTextContent('El texto debe tener al menos 3 caracteres.');
    });

    it('Renderizado condicional: muestra badge de oferta solo si el producto está en oferta', () => {
      const prodOferta = {
        id: 2,
        nombre: 'Miel Orgánica',
        categoria: 'Productos Orgánicos',
        precio: 4500,
        stock: 50,
        unidad: 'frasco',
        descripcion: 'Pura de abeja',
        imagen: '/assets/miel.jpg',
        enOferta: true,
        precioOferta: 3990
      };

      render(
        <CartProvider>
          <BrowserRouter>
            <ProductCard producto={prodOferta} />
          </BrowserRouter>
        </CartProvider>
      );

      expect(screen.getByText('🔥 OFERTA')).toBeInTheDocument();
    });
  });

  // ========================================================
  // 2. PRUEBAS DE PROPIEDADES (PROPS)
  // ========================================================
  describe('2. Pruebas de Propiedades (props)', () => {
    it('Propiedades recibidas: el componente de botón recibe correctamente la etiqueta y la utiliza', () => {
      const funcionMock = vi.fn();
      render(<BotonAccion etiqueta="Agregar al Carrito" onClick={funcionMock} />);

      const boton = screen.getByText('Agregar al Carrito');
      expect(boton).toBeInTheDocument();
    });
  });

  // ========================================================
  // 3. PRUEBAS DE ESTADO (STATE)
  // ========================================================
  describe('3. Pruebas de Estado (state)', () => {
    it('Gestión del estado: verifica que el estado de un formulario cambia cuando el usuario introduce texto', () => {
      render(<FormularioPrueba />);

      const input = screen.getByLabelText('campo-texto');
      expect(input.value).toBe('');

      // Simular cambio de texto en el input
      fireEvent.change(input, { target: { value: 'Naranjas Orgánicas' } });

      // Comprobar que el estado interno se actualizó en el valor del input
      expect(input.value).toBe('Naranjas Orgánicas');
    });
  });

  // ========================================================
  // 4. PRUEBAS DE EVENTOS
  // ========================================================
  describe('4. Pruebas de Eventos', () => {
    it('Simulación de eventos: simula un clic en un botón y comprueba que se ejecute la función onClick', () => {
      const spyOnClick = vi.fn();
      render(<BotonAccion etiqueta="Pagar Pedido" onClick={spyOnClick} />);

      const boton = screen.getByText('Pagar Pedido');
      fireEvent.click(boton);

      expect(spyOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
