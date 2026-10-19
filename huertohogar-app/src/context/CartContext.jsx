import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerCarrito, guardarCarrito, limpiarCarrito as dbLimpiarCarrito } from '../data/db';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => obtenerCarrito());

  useEffect(() => {
    guardarCarrito(cart);
  }, [cart]);

  const addToCart = (producto, cantidad = 1) => {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) {
      return { success: false, message: 'La cantidad debe ser mayor a 0.' };
    }

    const itemExistente = cart.find((item) => item.id === producto.id);
    const cantidadActualEnCarro = itemExistente ? itemExistente.cantidad : 0;
    const nuevaCantidad = cantidadActualEnCarro + cant;

    if (nuevaCantidad > producto.stock) {
      return {
        success: false,
        message: `Stock insuficiente. Solo quedan ${producto.stock} unidades disponibles (ya tienes ${cantidadActualEnCarro} en el carrito).`
      };
    }

    const precioFinal = producto.enOferta && producto.precioOferta ? producto.precioOferta : producto.precio;

    if (itemExistente) {
      setCart(
        cart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad, subtotal: nuevaCantidad * precioFinal }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: precioFinal,
          precioOriginal: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          unidad: producto.unidad,
          categoria: producto.categoria,
          cantidad: cant,
          subtotal: cant * precioFinal
        }
      ]);
    }

    return { success: true, message: `¡Agregaste ${cant} ${producto.nombre} al carrito!` };
  };

  const updateQuantity = (id, nuevaCantidad) => {
    const cant = Number(nuevaCantidad);
    if (cant <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const cantidadAjustada = Math.min(cant, item.stock);
          return {
            ...item,
            cantidad: cantidadAjustada,
            subtotal: cantidadAjustada * item.precio
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    dbLimpiarCarrito();
  };

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);
  const cartTotal = cart.reduce((total, item) => total + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
