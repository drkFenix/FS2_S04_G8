const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Manzanas Fuji',
    categoria: 'Frutas Frescas',
    precio: 1200,
    stock: 150,
    unidad: 'kilo',
    descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Ricas en fibra y antioxidantes.',
    imagen: '/assets/manzanas.jpg',
    enOferta: true,
    precioOferta: 990
  },
  {
    id: 2,
    nombre: 'Naranjas Valencia',
    categoria: 'Frutas Frescas',
    precio: 1000,
    stock: 200,
    unidad: 'kilo',
    descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos matutinos frescos y refrescantes.',
    imagen: '/assets/naranjas.png',
    enOferta: false,
    precioOferta: null
  },
  {
    id: 3,
    nombre: 'Plátanos Cavendish',
    categoria: 'Frutas Frescas',
    precio: 800,
    stock: 250,
    unidad: 'kilo',
    descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno o snack energético de deportistas.',
    imagen: '/assets/platanos.png',
    enOferta: false,
    precioOferta: null
  },
  {
    id: 4,
    nombre: 'Zanahorias Orgánicas',
    categoria: 'Verduras Orgánicas',
    precio: 900,
    stock: 180,
    unidad: 'kilo',
    descripcion: 'Cultivadas sin pesticidas, dulces y crujientes. Aportan una alta dosis de betacaroteno.',
    imagen: '/assets/zanahorias.jpg',
    enOferta: true,
    precioOferta: 750
  },
  {
    id: 5,
    nombre: 'Espinacas Frescas',
    categoria: 'Verduras Orgánicas',
    precio: 700,
    stock: 90,
    unidad: 'bolsa 500g',
    descripcion: 'Hojas verdes tiernas, ideales para ensaladas crudas o salteados ricos en hierro.',
    imagen: '/assets/espinacas.jpg',
    enOferta: false,
    precioOferta: null
  },
  {
    id: 6,
    nombre: 'Pimientos Tricolores',
    categoria: 'Verduras Orgánicas',
    precio: 1500,
    stock: 80,
    unidad: 'pack 3u',
    descripcion: 'Rojo, amarillo y verde. Sabor fresco y crocante para dar color a tus preparaciones.',
    imagen: '/assets/pimientos.jpg',
    enOferta: false,
    precioOferta: null
  },
  {
    id: 7,
    nombre: 'Miel Orgánica',
    categoria: 'Productos Orgánicos',
    precio: 4500,
    stock: 50,
    unidad: 'frasco 500g',
    descripcion: 'Miel pura de abeja de bosque nativo, sin aditivos ni preservantes. Dulzura natural.',
    imagen: '/assets/miel.jpg',
    enOferta: true,
    precioOferta: 3990
  },
  {
    id: 8,
    nombre: 'Quinua Orgánica',
    categoria: 'Productos Orgánicos',
    precio: 3200,
    stock: 70,
    unidad: 'bolsa 1kg',
    descripcion: 'Superalimento andino libre de gluten, rico en proteínas, fibra y minerales esenciales.',
    imagen: '/assets/quinua.png',
    enOferta: false,
    precioOferta: null
  },
  {
    id: 9,
    nombre: 'Leche Entera',
    categoria: 'Productos Lácteos',
    precio: 1100,
    stock: 120,
    unidad: 'litro',
    descripcion: 'Leche fresca de pastoreo natural del sur de Chile, pasteurizada y con sabor auténtico.',
    imagen: '/assets/leche.jpg',
    enOferta: false,
    precioOferta: null
  }
];

const ORDENES_INICIALES = [
  {
    id: 1,
    numeroOrden: 20240705,
    fecha: '2026-10-15',
    cliente: {
      nombre: 'Pedro',
      apellidos: 'Hacker',
      correo: 'pedro.hacker20@example.com',
      calle: 'Los Crisantemos, Edificio Norte',
      departamento: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
      indicaciones: 'El martes no estaremos en el depto, pero puede dejárselo con el conserje.'
    },
    items: [
      { id: 1, nombre: 'Manzanas Fuji', precio: 990, cantidad: 2, subtotal: 1980 },
      { id: 7, nombre: 'Miel Orgánica', precio: 3990, cantidad: 1, subtotal: 3990 }
    ],
    total: 5970,
    estado: 'completada'
  }
];

const STORAGE_KEYS = {
  PRODUCTOS: 'huertohogar_productos',
  ORDENES: 'huertohogar_ordenes',
  CARRITO: 'huertohogar_carrito'
};

export function obtenerProductos() {
  const guardados = localStorage.getItem(STORAGE_KEYS.PRODUCTOS);
  if (!guardados) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
    return PRODUCTOS_INICIALES;
  }
  try {
    return JSON.parse(guardados);
  } catch (e) {
    return PRODUCTOS_INICIALES;
  }
}

export function obtenerProductoPorId(id) {
  const productos = obtenerProductos();
  return productos.find((p) => p.id === Number(id)) || null;
}

export function crearProducto(nuevoProducto) {
  const productos = obtenerProductos();
  const nuevoId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
  const productoConId = {
    ...nuevoProducto,
    id: nuevoId,
    precio: Number(nuevoProducto.precio),
    stock: Number(nuevoProducto.stock),
    precioOferta: nuevoProducto.enOferta ? Number(nuevoProducto.precioOferta || nuevoProducto.precio) : null
  };
  const listaActualizada = [...productos, productoConId];
  localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(listaActualizada));
  return productoConId;
}

export function actualizarProducto(id, datosActualizados) {
  const productos = obtenerProductos();
  const index = productos.findIndex((p) => p.id === Number(id));
  if (index === -1) return null;

  productos[index] = {
    ...productos[index],
    ...datosActualizados,
    precio: Number(datosActualizados.precio ?? productos[index].precio),
    stock: Number(datosActualizados.stock ?? productos[index].stock),
    precioOferta: datosActualizados.enOferta 
      ? Number(datosActualizados.precioOferta ?? productos[index].precioOferta ?? productos[index].precio)
      : null
  };

  localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(productos));
  return productos[index];
}

export function eliminarProducto(id) {
  const productos = obtenerProductos();
  const listaFiltrada = productos.filter((p) => p.id !== Number(id));
  localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(listaFiltrada));
  return true;
}

export function obtenerOrdenes() {
  const guardadas = localStorage.getItem(STORAGE_KEYS.ORDENES);
  if (!guardadas) {
    localStorage.setItem(STORAGE_KEYS.ORDENES, JSON.stringify(ORDENES_INICIALES));
    return ORDENES_INICIALES;
  }
  try {
    return JSON.parse(guardadas);
  } catch (e) {
    return ORDENES_INICIALES;
  }
}

export function crearOrden(datosOrden) {
  const ordenes = obtenerOrdenes();
  const numeroOrden = Math.floor(10000000 + Math.random() * 90000000);
  const nuevaOrden = {
    id: ordenes.length + 1,
    numeroOrden,
    fecha: new Date().toISOString().split('T')[0],
    ...datosOrden
  };

  const listaActualizada = [nuevaOrden, ...ordenes];
  localStorage.setItem(STORAGE_KEYS.ORDENES, JSON.stringify(listaActualizada));

  if (nuevaOrden.estado === 'completada' && nuevaOrden.items) {
    const productos = obtenerProductos();
    nuevaOrden.items.forEach((item) => {
      const prod = productos.find((p) => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.cantidad);
      }
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTOS, JSON.stringify(productos));
  }

  return nuevaOrden;
}

export function obtenerCarrito() {
  const guardado = localStorage.getItem(STORAGE_KEYS.CARRITO);
  if (!guardado) return [];
  try {
    return JSON.parse(guardado);
  } catch (e) {
    return [];
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify(carrito));
}

export function limpiarCarrito() {
  localStorage.removeItem(STORAGE_KEYS.CARRITO);
}
