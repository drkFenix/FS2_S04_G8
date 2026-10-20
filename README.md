# HuertoHogar - DSY1104 Desarrollo Full Stack II

Plataforma e-commerce para venta de frutas, verduras y productos orgánicos, desarrollada con React, Vite y Bootstrap para la asignatura **Desarrollo Full Stack II (DSY1104)** de Duoc UC.

## Integrantes - Grupo 8
- Camilo Pérez
- Bryan Rodríguez
- Hugo Pinto

---

## Tecnologías Utilizadas
- **Frontend:** React 19, Vite, React-Bootstrap, Bootstrap 5, Bootstrap Icons
- **Enrutamiento:** React Router DOM (Single Page Application)
- **Testing:** Vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- **Despliegue:** AWS EC2 (Ubuntu 24.04 LTS en AWS Academy Learner Lab, Node.js 22, PM2)

---

## Estructura del Repositorio

- **`huertohogar-app/`**: Aplicación web en React:
  - `src/components/`: Componentes reutilizables (`Navbar.jsx`, `Footer.jsx`, `ProductCard.jsx`).
  - `src/pages/`: Vistas de la tienda (Catálogo, Categorías, Ofertas, Detalle, Carrito, Checkout) y panel de administración (`/admin`).
  - `src/context/`: Estado global del carrito (`CartContext.jsx`).
  - `src/data/`: Capa de datos simulada y persistencia en `localStorage` (`db.js`).
  - `src/__tests__/`: Batería de pruebas unitarias (`evaluacion2.test.jsx`).
  - `public/assets/`: Imágenes de catálogo y recursos estáticos.
- **`evaluacion-1/`**: Archivos de la primera entrega (HTML5, CSS3, JavaScript vanilla).
- **`Documentacion/`**: 
  - `ERS_HuertoHogar_V2.md`: Especificación de Requisitos de Software (V2).
  - `Documento_Cobertura_Testing.md`: Reporte de pruebas unitarias y cobertura.
  - `GUIA_DESPLIEGUE_AWS_EC2.md`: Guía técnica de despliegue en AWS EC2 (Markdown).
  - `GUIA_DESPLIEGUE_AWS_EC2.docx`: Guía técnica de despliegue en AWS EC2 (Word).

---

## Ejecución en Entorno Local

1. Ingresar a la carpeta de la aplicación:
```bash
cd huertohogar-app
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Ejecutar pruebas unitarias:
```bash
npm run test
```

---

## Despliegue en AWS EC2

Instrucciones para levantar la aplicación en una instancia Ubuntu en AWS Learner Lab:

```bash
git clone https://github.com/drkFenix/FS2_S04_G8.git
cd FS2_S04_G8/huertohogar-app
npm install
npm install -g pm2
pm2 start "npm start" --name "huertohogar"
```

El servicio queda accesible en la IP pública de la instancia:
```text
http://<IP_PUBLICA_EC2>:3000
```
