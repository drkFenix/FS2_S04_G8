const CARRITO_KEY = 'huertohogar_carrito';

export function obtenerCarrito() {
  const guardado = localStorage.getItem(CARRITO_KEY);
  if (!guardado) return [];
  try {
    return JSON.parse(guardado);
  } catch {
    return [];
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

export function limpiarCarrito() {
  localStorage.removeItem(CARRITO_KEY);
}
