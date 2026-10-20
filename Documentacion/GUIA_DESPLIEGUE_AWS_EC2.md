# Guía de Despliegue en AWS EC2 - HuertoHogar

**Proyecto:** HuertoHogar (React + Vite + React-Bootstrap)  
**Asignatura:** Desarrollo Full Stack II (DSY1104) - Duoc UC  
**Grupo 8:** Camilo Pérez, Bryan Rodríguez, Hugo Pinto  

---

## 1. Arquitectura y Componentes del Proyecto

La aplicación está construida sobre una arquitectura Single Page Application (SPA) en React:

| Módulo / Archivo | Rol en la Aplicación |
| :--- | :--- |
| **`CartContext.jsx`** | Administra el estado global del carrito de compras, cálculo de subtotales y persistencia con la capa de datos. |
| **`db.js`** | Mock database en JavaScript que inicializa el catálogo de productos y gestiona la persistencia en `localStorage`. |
| **`pages/`** | Vistas principales de la tienda (`Home`, `Categorias`, `Ofertas`, `Cart`, `Checkout`, `ProductDetail`) y panel administrativo (`/admin`). |
| **`components/`** | Componentes modulares reutilizables (`Navbar`, `Footer`, `ProductCard`). |
| **`public/assets/`** | Archivos estáticos e imágenes del catálogo de productos y logotipo institucional. |
| **`__tests__/`** | Suite de pruebas unitarias implementadas con Vitest y React Testing Library. |
| **`main.jsx` / `App.jsx`** | Punto de entrada del cliente, configuración del router (`react-router-dom`) y del contenedor de contexto. |

---

## 2. Parámetros para la Instancia EC2 (AWS Academy / Learner Lab)

En la consola de Amazon EC2, ingresar a **Launch Instances** (Lanzar instancias) y configurar los siguientes valores:

1. **Name:** `reactBootstrap`
2. **AMI (Application and OS Images):** `Ubuntu Server 24.04 LTS` o `Ubuntu Server 22.04 LTS` (64-bit x86).
3. **Instance Type:** `t2.micro` o `t3.micro` (disponible en la capa educativa de AWS Academy).
4. **Key Pair (Par de claves):** Crear un nuevo par de claves (ej: `userReact.pem`, tipo RSA) o seleccionar uno existente.
5. **Network Settings (Configuración de red):**
   - Habilitar tráfico HTTP y HTTPS.
   - En **Reglas de Security Group (Inbound Rules)**, agregar la regla para el puerto de la aplicación:
     - **Tipo:** Custom TCP (TCP personalizado)
     - **Puerto:** `3000`
     - **Origen:** `0.0.0.0/0` (Anywhere IPv4)
6. **Storage (Almacenamiento):** 20 GiB (gp3).

Presionar **Launch Instance** para iniciar la máquina virtual.

---

## 3. Conexión a la Instancia

1. En el panel de instancias de EC2, seleccionar la instancia `reactBootstrap`.
2. Presionar el botón **Connect** (Conectar).
3. Seleccionar la pestaña **EC2 Instance Connect** y presionar **Connect** para abrir una sesión interactiva en el navegador (o conectarse vía SSH mediante terminal con el archivo de clave privada `.pem`).

---

## 4. Instalación del Entorno y Ejecución en el Servidor

Ejecutar los siguientes comandos en la terminal de la instancia Ubuntu:

### 4.1 Actualización de paquetes del sistema
```bash
sudo apt-get update -y
```

### 4.2 Instalación de Node Version Manager (NVM)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 4.3 Instalación de Node.js (v22 LTS)
```bash
nvm install 22
node -v
npm -v
```

### 4.4 Clonación del repositorio
```bash
git clone https://github.com/drkFenix/FS2_S04_G8.git
```

### 4.5 Instalación de dependencias del proyecto
```bash
cd FS2_S04_G8/huertohogar-app
npm install
```

### 4.6 Gestión y ejecución del proceso con PM2
Para mantener el servidor ejecutándose en segundo plano de manera persistente:
```bash
npm install -g pm2
pm2 start "npm start" --name "huertohogar"
```

Para verificar el estado del proceso o ver logs:
```bash
pm2 status
pm2 logs huertohogar
```

---

## 5. Acceso y Verificación del Servicio

Una vez iniciado el proceso en PM2, abrir en el navegador web:

```text
http://<IP_PUBLICA_EC2>:3000
```

> **Nota sobre el protocolo:** La instancia utiliza protocolo HTTP directo en el puerto 3000 (`http://`), no HTTPS (`https://`), a menos que se configure previamente un certificado SSL y un reverse proxy como Nginx.
