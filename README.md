# HuertoHogar — Frontend React + Integración Full Stack (DSY1104 EP3)

Plataforma e-commerce para venta de frutas, verduras y productos orgánicos, desarrollada con **React 19, Vite 8, Axios y Bootstrap 5** e integrada a la API REST Spring Boot (`huertohogar-api`) con JWT y control de roles (`ADMIN`, `VENDEDOR`, `CLIENTE`), para la asignatura **Desarrollo Full Stack II (DSY1104)** de Duoc UC.

## Integrantes — Grupo 8
- Bryan Rodríguez
- Camilo Pérez
- Hugo Pinto

---

## Repositorios del Proyecto
- **Frontend (este repositorio):** https://github.com/drkFenix/FS2_S04_G8
- **Backend Spring Boot + MySQL 8.4:** https://github.com/drkFenix/huertohogar-api

---

## Tecnologías Utilizadas
- **Frontend:** React 19, Vite 8.3, React Router DOM 7, React-Bootstrap, Bootstrap 5, Bootstrap Icons
- **Integración API & Seguridad:** Axios (`src/api/httpClient.js`) con inyección automática de `Bearer` JWT y renovación transparente vía `/api/v1/auth/refresh`, rutas protegidas por rol (`ProtectedRoute.jsx`) y persistencia de sesión (`AuthContext.jsx`)
- **Testing y Calidad:** Vitest 5, `@testing-library/react`, `@testing-library/jest-dom`, `@vitest/coverage-v8`, `oxlint`
- **Despliegue:** AWS EC2 (Ubuntu 24.04 LTS, Nginx reverse proxy + build estático Vite + backend Spring Boot `systemd`)

---

## Estructura del Repositorio

- **`huertohogar-app/`**: Aplicación web React + Vite:
  - `src/api/httpClient.js`: Cliente Axios centralizado con interceptores JWT y refresh automático.
  - `src/services/`: Servicios REST por recurso (`authService`, `productService`, `categoryService`, `orderService`, `userService`, `dashboardService`).
  - `src/context/`: Estado global de autenticación (`AuthContext.jsx`) y carrito (`CartContext.jsx`).
  - `src/components/`: `Navbar.jsx`, `Footer.jsx`, `ProductCard.jsx`, `ProtectedRoute.jsx`.
  - `src/pages/`: Tienda pública, carrito, checkout, perfil, vistas de solo lectura `VENDEDOR` (`/vendedor/*`) y panel completo `ADMIN` (`/admin/*`).
  - `src/__tests__/`: Pruebas unitarias reales (`ProductCard.test.jsx`, `AuthAndRoles.test.jsx`).
  - `public/assets/`: Imágenes de catálogo y recursos estáticos.
- **`evaluacion-1/`**: Archivos históricos de la primera entrega (HTML5, CSS3 y JavaScript).

---

## Ejecución Local (con Backend corriendo en `:8080`)

```bash
cd huertohogar-app
cp .env.example .env.local
npm install
npm run test
npm run lint
npm run dev
```

La tienda queda disponible en http://localhost:5173 (conectada al backend en http://localhost:8080/api/v1).
