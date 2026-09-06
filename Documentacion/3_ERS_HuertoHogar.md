# Especificación de Requisitos de Software (ERS) - HuertoHogar

## 1. Introducción
**1.1 Propósito:** 
El propósito de este documento es definir los requerimientos funcionales y no funcionales para la tienda web "HuertoHogar", la cual busca acercar productos del campo a las familias chilenas de manera sostenible.

**1.2 Alcance:** 
El proyecto contempla el desarrollo de la interfaz de usuario (Frontend), abarcando la página principal, el catálogo distribuido en 4 categorías, y un sistema básico de registro y autenticación de usuarios.

## 2. Descripción General
**2.1 Funciones del Producto:**
- Registro de nuevos usuarios con validación instantánea de datos.
- Autenticación de usuarios existentes.
- Navegación por categorías de productos agrícolas.
- Visualización de catálogos detallados.

**2.2 Características de los Usuarios:**
Clientes (familias y personas independientes) orientados a un estilo de vida saludable, que buscan productos orgánicos, frescos y locales con una navegación sencilla y rápida.

## 3. Requisitos Específicos
### 3.1 Requisitos Funcionales
- **RF-01:** El sistema mostrará alertas si los datos del registro no cumplen con los formatos (nombre > 3 caracteres, email válido, password > 8 caracteres).
- **RF-02:** Los productos se presentarán en formato de tarjetas ("Cards") divididos en páginas independientes según su categoría.
- **RF-03:** Todas las vistas estarán interconectadas mediante una barra de navegación superior (Header/Nav).

### 3.2 Requisitos No Funcionales
- **RNF-01 (Usabilidad):** El diseño debe ser limpio, evitando la sobrecarga visual, destacando los productos frescos (usando fondo #F7F7F7).
- **RNF-02 (Tecnología):** Se utilizará HTML5 y CSS nativo, sin recurrir a frameworks externos como Bootstrap, para evaluar el dominio puro del lenguaje. JavaScript se utilizará exclusivamente en el cliente.
- **RNF-03 (Control de Versiones):** Todo el progreso debe estar respaldado mediante commits claros en un repositorio de Git/GitHub.
