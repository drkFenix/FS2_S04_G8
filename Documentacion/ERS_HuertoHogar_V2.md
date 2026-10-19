# Especificación de Requerimientos de Software (ERS) - V2
## Proyecto: HuertoHogar - Plataforma Web E-commerce en React
### Evaluación 2 (30%) - Duoc UC | Escuela de Informática y Telecomunicaciones
**Grupo 8:**
- Camilo Perez (Catálogo de Productos y Ofertas)
- Bryan Rodriguez (Página Principal, Enrutamiento y Navegación)
- Hugo Pinto (Carrito de Compras, Checkout y Validaciones)

---

## 1. Introducción y Propósito
El presente documento describe la segunda iteración y actualización de la Especificación de Requerimientos de Software (ERS V2) para la plataforma web **HuertoHogar**. En esta fase, la aplicación migró completamente desde páginas HTML/CSS estáticas a una **Single Page Application (SPA) moderna desarrollada con React y Vite**, incorporando persistencia en el cliente, operaciones CRUD, flujo completo de compras (carrito y checkout), panel de administración e implementación de pruebas unitarias automatizadas.

---

## 2. Arquitectura y Tecnologías
- **Librería Principal:** React 19 (Hooks: `useState`, `useEffect`, `useContext`, `useParams`, `useNavigate`).
- **Empaquetador y Servidor Local:** Vite 8.
- **Enrutamiento:** `react-router-dom` v7 (navegación SPA sin recarga de página).
- **Framework de Estilos:** Bootstrap 5 y `react-bootstrap` (diseño 100% responsivo para móviles, tablets y escritorios).
- **Persistencia de Datos:** `localStorage` mediante capa de datos simulada en JavaScript (`src/data/db.js`).
- **Entorno de Pruebas:** Vitest + React Testing Library + Jest-DOM (compatible con Jasmine API).

---

## 3. Requerimientos Funcionales (RF)

### 3.1 Módulo Tienda Pública (Cliente)
- **RF-01 [Página de Inicio / Home]:**
  - Despliegue de banner hero con propuesta de valor de HuertoHogar.
  - Buscador dinámico de productos en tiempo real por nombre o categoría.
  - Sección de tarjetas de categorías destacadas (Frutas, Verduras, Orgánicos, Lácteos).
  - Carrusel o grilla de ofertas imperdibles y catálogo general.

- **RF-02 [Catálogo y Filtro por Categorías]:**
  - Vista dedicada que permite filtrar productos por: "Todas", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos" y "Productos Lácteos".
  - Sincronización con la URL mediante parámetros de búsqueda (`?cat=`).

- **RF-03 [Módulo de Ofertas y Descuentos]:**
  - Vista exclusiva (`/ofertas`) que filtra y muestra únicamente productos con descuento activo.
  - Presentación del precio normal tachado, el precio rebajado en color distintivo y badge `"🔥 OFERTA"`.

- **RF-04 [Detalle de Producto]:**
  - Vista individual accesible vía `/producto/:id`.
  - Muestra imagen ampliada, categoría, stock en tiempo real, descripción nutricional/origen y selector de cantidad con validación de límite de stock.

- **RF-05 [Carrito de Compras Persistente]:**
  - Tabla interactiva con columnas: Imagen, Nombre, Precio, Cantidad (con controles `+` y `-`), Subtotal y botón de eliminación.
  - Almacenamiento sincronizado en `localStorage` (los productos no se pierden al recargar).
  - Opción de vaciar el carrito completo.
  - Botón de navegación al paso de Checkout.

- **RF-06 [Checkout y Datos de Entrega]:**
  - Formulario estructurado según la propuesta de interfaz:
    - *Información del cliente:* Nombre, Apellidos, Correo electrónico.
    - *Dirección de entrega:* Calle y número, Departamento (opcional), Región de Chile y Comuna asociada, Indicaciones de entrega.
  - Control de prueba para simular pago exitoso o pago fallido (evaluación docente).

- **RF-07 [Pantallas de Confirmación de Pago]:**
  - **Pago Correcto (`/compra-exitosa`):** Generación de número de orden aleatorio de 8 dígitos (ej: `#20240705`), resumen detallado del comprador, dirección y desglose de productos. Opciones de imprimir boleta y enviar por correo.
  - **Pago con Error (`/compra-fallida`):** Mensaje de alerta de rechazo de transacción bancaria con botón destacado `"VOLVER A REALIZAR EL PAGO"` conservando los datos de la orden.

- **RF-08 [Vistas Complementarias]:**
  - Vista Nosotros (`/nosotros`): Misión, pilares de comercio justo y apoyo a agricultores.
  - Vista Blog (`/blog`): Artículos sobre vida sana con modal de lectura completa.
  - Vista Contacto (`/contacto`): Formulario de atención al cliente.
  - Vistas de Login y Registro (`/login`, `/registro`): Formularios con validación en React.

---

### 3.2 Módulo Panel de Administración (Admin)
- **RF-09 [Dashboard de Métricas]:**
  - Tarjetas de resumen en tiempo real: Total de ventas en pesos chilenos ($ CLP), Cantidad de productos en catálogo, Clientes frecuentes y alerta de stock crítico.
  - Cuadrícula de accesos directos a los módulos del sistema.

- **RF-10 [CRUD de Productos con Persistencia]:**
  - **Create:** Modal para añadir un nuevo producto indicando nombre, categoría, precio, stock, unidad de medida, imagen y opción de oferta.
  - **Read:** Tabla de administración con buscador y switch para filtrar exclusivamente artículos con **Stock Crítico** (≤ 50 unidades).
  - **Update:** Edición completa de datos de cualquier producto existente en el modal.
  - **Delete:** Eliminación de productos con confirmación de seguridad.

- **RF-11 [Gestión de Órdenes y Boletas]:**
  - Historial de todas las compras generadas desde el Checkout.
  - Modal con visor de **Boleta Electrónica** oficial de HuertoHogar SpA, con opción de impresión.

---

## 4. Requerimientos No Funcionales (RNF)
- **RNF-01 [Diseño Responsivo con Bootstrap]:** Interfaz adaptable a pantallas móviles (< 768px), tablets y monitores de escritorio.
- **RNF-02 [Principio de Responsabilidad Única (SRP)]:** Cada componente de React (`ProductCard`, `Navbar`, `Footer`, etc.) gestiona únicamente su función específica.
- **RNF-03 [Persistencia en Cliente]:** El catálogo, las órdenes y el carrito persisten en `localStorage` sin depender de un servidor backend externo en esta etapa.
- **RNF-04 [Cobertura de Pruebas Unitarias]:** Verificación automatizada de renderizado, renderizado condicional, props, state y eventos con Vitest y React Testing Library.

---

## 5. Diagrama de Navegación del Sistema

```
                         [ HUERTOHOGAR SPA ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
   [ TIENDA PÚBLICA ]                             [ PANEL ADMINISTRADOR ]
         │                                                 │
   ├─ Home (/)                                       ├─ Dashboard (/admin)
   ├─ Categorías (/categorias)                       ├─ CRUD Productos (/admin/productos)
   ├─ Ofertas (/ofertas)                             │   ├─ Nuevo Producto
   ├─ Detalle Producto (/producto/:id)               │   ├─ Editar Producto
   ├─ Carrito (/carrito)                             │   ├─ Eliminar Producto
   ├─ Checkout (/checkout)                           │   └─ Alerta Stock Crítico
   │    ├─ Compra Exitosa (/compra-exitosa)          └─ Órdenes / Boletas (/admin/ordenes)
   │    └─ Compra Fallida (/compra-fallida)
   ├─ Nosotros (/nosotros)
   ├─ Blog (/blog)
   ├─ Contacto (/contacto)
   ├─ Iniciar Sesión (/login)
   └─ Registro (/registro)
```
