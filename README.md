# HuertoHogar - Desarrollo Full Stack II (DSY1104)

Proyecto semestral para la asignatura **Desarrollo Full Stack II (DSY1104)** de Duoc UC.

---

## 📋 Implementación Guía 2.1.2: React Bootstrap y Despliegue en AWS EC2

Este repositorio contiene la implementación completa de la **Guía 2.1.2: Configuración de React Bootstrap en un entorno de desarrollo en EC2 de AWS**.

### 🛠️ Tecnologías y Librerías Utilizadas
- **React 19** con **Vite**
- **Bootstrap 5** y **React-Bootstrap**
- **React Router Dom** (Navegación SPA)
- **Vitest** y **Testing Library** (Pruebas unitarias)
- **Amazon EC2 (AWS Academy Learner Lab)** (Servidor Ubuntu con Node.js 22 y PM2)

---

## 📁 Estructura del Repositorio

- **`huertohogar-app/`**: Aplicación web completa en React:
  - `src/components/`: Componentes reutilizables (`Navbar.jsx`, `Footer.jsx`, `ProductCard.jsx`).
  - `src/pages/`: Pantallas principales de la tienda y panel administrativo (`Home`, `Cart`, `Checkout`, `AdminProducts`, etc.).
  - `src/context/`: `CartContext.jsx` para el estado global y lógica del carrito de compras.
  - `src/data/`: `db.js` con el catálogo de productos y almacenamiento local (Mock DB).
  - `public/assets/`: Imágenes de los productos y logotipo.
  - `src/__tests__/`: Pruebas unitarias automatizadas.
- **`evaluacion-1/`**: Archivos estáticos originales en HTML, CSS y JS de la primera entrega.
- **`Documentacion/`**: 
  - `GUIA_DESPLIEGUE_AWS_EC2.docx`: Guía paso a paso en formato Word.
  - `GUIA_DESPLIEGUE_AWS_EC2.md`: Guía de despliegue en formato Markdown.
  - `ERS_HuertoHogar_V2.md`: Especificación de Requisitos de Software versión 2.
  - `Documento_Cobertura_Testing.md`: Reporte de testing y pruebas unitarias.

---

## 🚀 Ejecución en Local

```bash
cd huertohogar-app
npm install
npm run dev
```

---

## ☁️ Despliegue en Servidor AWS EC2

Para levantar el proyecto en una instancia EC2 (Ubuntu):

```bash
git clone https://github.com/drkFenix/FS2_S04_G8.git
cd FS2_S04_G8/huertohogar-app
npm install
npm install -g pm2
pm2 start "npm start" --name "huertohogar"
```

El servidor queda disponible para navegación pública en:
```text
http://<IP_PUBLICA_EC2>:3000
```
