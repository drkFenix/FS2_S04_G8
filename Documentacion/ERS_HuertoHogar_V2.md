# Especificación de Requerimientos de Software (ERS) - V2

**Proyecto:** HuertoHogar - Plataforma Web E-commerce en React  
**Evaluación:** Evaluación 2 (30%) - Duoc UC | Escuela de Informática y Telecomunicaciones  
**Grupo 8:**
- Camilo Pérez
- Bryan Rodríguez
- Hugo Pinto

---

## 1. Introducción y Alcance
Este documento corresponde a la segunda entrega de la Especificación de Requerimientos de Software para la plataforma web **HuertoHogar**. En esta etapa, el proyecto evolucionó desde maquetación estática en HTML/CSS a una **Single Page Application (SPA) desarrollada en React con Vite**, incorporando navegación mediante rutas dinámicas, estado global para el carrito de compras, persistencia en el cliente con `localStorage`, catálogo administrable con operaciones CRUD, control de stock crítico y batería de pruebas unitarias.

---

## 2. Tecnologías y Arquitectura
- **Frontend:** React 19 (uso de hooks: `useState`, `useEffect`, `useContext`, `useParams`, `useNavigate`).
- **Empaquetador y Build Tool:** Vite.
- **Navegación:** `react-router-dom` (arquitectura SPA sin recarga de página).
- **Estilos e Interfaz:** Bootstrap 5, `react-bootstrap` y Bootstrap Icons (diseño responsivo).
- **Capa de Datos:** `localStorage` mediante módulo JavaScript (`src/data/db.js`).
- **Testing:** Vitest, React Testing Library y Jest-DOM.

---

## 3. Requerimientos Funcionales (RF)

### 3.1 Módulo Tienda Pública (Cliente)
- **RF-01 [Página Principal / Home]:**
  - Banner hero con mensaje de marca y propuesta de valor.
  - Buscador de productos en tiempo real por nombre o categoría.
  - Acceso directo a categorías destacadas (Frutas, Verduras, Orgánicos, Lácteos).
  - Bloque de productos en oferta y catálogo general.

- **RF-02 [Catálogo y Filtro por Categorías]:**
  - Vista dedicada (`/categorias`) con filtrado por: "Todas", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos" y "Productos Lácteos".
  - Sincronización de la categoría activa mediante query params en la URL (`?cat=`).

- **RF-03 [Módulo de Ofertas]:**
  - Vista exclusiva (`/ofertas`) que lista productos con descuento activo.
  - Despliegue de precio normal, precio rebajado y badge de oferta.

- **RF-04 [Detalle de Producto]:**
  - Vista de producto accesible mediante ruta dinámica `/producto/:id`.
  - Muestra imagen, categoría, precio, stock disponible, descripción y selector de cantidad respetando el límite de inventario.

- **RF-05 [Carrito de Compras]:**
  - Tabla de productos agregados con imagen, nombre, precio unitario, selector de cantidad (+ / -), subtotal y opción de eliminar artículo.
  - Persistencia de los datos en `localStorage` al recargar la página.
  - Opción de vaciar el carrito completo y botón de redirección al Checkout.

- **RF-06 [Checkout y Formulario de Entrega]:**
  - Formulario con campos de validación:
    - *Datos personales:* Nombre, Apellidos, Correo electrónico.
    - *Dirección:* Calle y número, Departamento/Casa, Región de Chile y Comuna asociada (con filtrado dinámico según la región), Indicaciones de entrega.
  - Selector de modo sandbox para simular respuestas de pago aprobadas o rechazadas.

- **RF-07 [Confirmación de Pago]:**
  - **Pago Aprobado (`/compra-exitosa`):** Generación de número de orden, resumen del comprador, dirección de entrega, detalle de productos adquiridos y opción de imprimir boleta.
  - **Pago Rechazado (`/compra-fallida`):** Aviso de transacción no procesada con opción de reintentar el pago conservando los datos de la compra.

- **RF-08 [Vistas Informativas e Interacción]:**
  - Vista Nosotros (`/nosotros`): Misión, pilares y origen de los productos.
  - Vista Blog (`/blog`): Artículos sobre vida sana con modal de lectura.
  - Vista Contacto (`/contacto`): Formulario de consultas con confirmación de envío.
  - Vistas de Login y Registro (`/login`, `/registro`): Formularios con validación en cliente.

---

## 3.2 Módulo Panel de Administración (Admin)
- **RF-09 [Dashboard de Métricas]:**
  - Indicadores clave en tiempo real: Total de ventas en pesos chilenos ($ CLP), cantidad de productos en catálogo, clientes frecuentes y alerta de stock crítico.
  - Accesos directos a los módulos de inventario, órdenes y catálogo.

- **RF-10 [CRUD de Productos]:**
  - **Crear:** Modal para añadir nuevo producto con nombre, categoría, precio, stock, unidad de medida, imagen y descuento opcional.
  - **Leer:** Tabla con buscador y filtro para identificar artículos con Stock Crítico (≤ 50 unidades).
  - **Actualizar:** Edición completa de datos de cualquier producto desde modal.
  - **Eliminar:** Baja de producto con confirmación de usuario.

- **RF-11 [Historial de Órdenes y Boletas]:**
  - Registro de compras procesadas en la plataforma.
  - Modal con visor de boleta electrónica con detalle tributario y botón de impresión.

---

## 4. Requerimientos No Funcionales (RNF)
- **RNF-01 [Diseño Responsivo]:** Interfaz adaptada a dispositivos móviles, tablets y pantallas de escritorio mediante Bootstrap 5.
- **RNF-02 [Componentización y Modularidad]:** Separación de componentes reutilizables (`Navbar`, `Footer`, `ProductCard`) y vistas desacopladas.
- **RNF-03 [Persistencia en Cliente]:** Persistencia de catálogo, órdenes y carrito en el navegador utilizando la API de `localStorage`.
- **RNF-04 [Pruebas Automatizadas]:** Suite de pruebas unitarias implementada con Vitest y React Testing Library para validar renderizado, props, estado y eventos.

---

## 5. Estructura de Navegación

```
                         [ HUERTOHOGAR SPA ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
   [ TIENDA PÚBLICA ]                             [ PANEL ADMINISTRADOR ]
         │                                                 │
   ├─ Inicio (/)                                     ├─ Dashboard (/admin)
   ├─ Categorías (/categorias)                       ├─ Gestión Productos (/admin/productos)
   ├─ Ofertas (/ofertas)                             │   ├─ Crear Producto
   ├─ Detalle Producto (/producto/:id)               │   ├─ Editar Producto
   ├─ Carrito (/carrito)                             │   ├─ Eliminar Producto
   ├─ Checkout (/checkout)                           │   └─ Filtro Stock Crítico
   │    ├─ Compra Exitosa (/compra-exitosa)          └─ Órdenes y Boletas (/admin/ordenes)
   │    └─ Compra Fallida (/compra-fallida)
   ├─ Nosotros (/nosotros)
   ├─ Blog (/blog)
   ├─ Contacto (/contacto)
   ├─ Iniciar Sesión (/login)
   └─ Registro (/registro)
```
