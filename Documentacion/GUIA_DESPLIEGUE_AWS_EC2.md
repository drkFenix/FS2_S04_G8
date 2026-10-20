# Guía del Proyecto y Despliegue en AWS EC2

**Proyecto:** HuertoHogar (React + Bootstrap)  
**Asignatura:** DSY1104 Desarrollo Full Stack II  

---

## 1. Estructura y Funcionamiento del Proyecto (¿Qué es cada cosa?)

| Elemento / Carpeta | Concepto clave | Función en HuertoHogar |
| :--- | :--- | :--- |
| **`CartContext`** | Lógica y Memoria | Cerebro central del carrito: guarda los productos seleccionados, calcula el precio total a pagar y provee funciones para agregar, restar o vaciar. |
| **`data` (`db.js`)** | Nuestros Objetos | Base de datos simulada con los objetos del catálogo: manzanas, naranjas, leche, etc., con su id, precio, stock y categoría. |
| **`pages`** | Ventanas / Pantallas | Vistas completas de la tienda: Inicio (Home), Carrito (Cart), Pagar (Checkout), Administrador (AdminProducts), Login y Registro. |
| **`components`** | Piezas Reutilizables | Bloques que arman la página: Navbar (encabezado/menú), Footer (pie de página) y ProductCard (tarjeta de cada producto). |
| **`assets` (`public/assets`)** | Imágenes | Carpeta pública donde se alojan las fotos de los productos (`manzanas.jpg`, `platanos.png`, `logo.png`) para que carguen directo en la web. |
| **`__tests__` (`test`)** | Pruebas Unitarias | Pruebas automáticas que validan que el carrito sume bien y que el CRUD funcione correctamente sin errores. |
| **`main.jsx`** | Punto de Partida | Primer archivo que se ejecuta al abrir la web; inyecta React en el HTML principal. |
| **`App.jsx`** | Organizador Maestro | Conecta las rutas del menú, coloca el Navbar arriba, el Footer abajo y muestra la página correspondiente. |
| **`index.css` / `App.css`** | Estilos Visuales | `index.css` define fuentes y colores globales; `App.css` aplica los estilos de tarjetas y botones. |
| **`setupTests.js`** | Preparador de Pruebas | Configura las librerías de prueba (`@testing-library/jest-dom`) para simular el navegador en los tests. |

---

## 2. Parámetros exactos para Crear la Instancia en AWS EC2

Al entrar a la consola de AWS EC2 y presionar el botón naranja **Lanzar instancias** (*Launch instance*), completa únicamente estos datos:

| Sección en AWS | Campo | Valor a colocar |
| :--- | :--- | :--- |
| **Nombre y etiquetas** | Nombre | `reactBootstrap` |
| **Imágenes de software (AMI)** | Sistema Operativo | Clic en el recuadro naranja **Ubuntu** (Ubuntu 22.04 o 24.04 LTS) |
| **Tipo de instancia** | Tipo de servidor | `t2.micro` o `t3.micro` (Apto para capa gratuita) |
| **Par de claves (Key Pair)** | Clave de acceso | Crear nuevo par -> Nombre: `userReact`, tipo RSA, formato `.pem` |
| **Configuración de red** | Casillas rápidas | Marcar casillas: ✅ **HTTPS** y ✅ **HTTP** |
| | Editar reglas | Clic en **Editar** -> **Agregar regla**:<br>• **Tipo:** `TCP personalizado`<br>• **Puerto:** `3000`<br>• **Origen:** `Cualquier lugar` (`0.0.0.0/0`) |
| **Almacenamiento** | Tamaño de disco | Cambiar de `8 GiB` a **`20 GiB`** (gp3) |

Presiona el botón naranja **Lanzar instancia**.

---

## 3. Conectarse a la Máquina Virtual

1. En la lista de EC2 selecciona la instancia `reactBootstrap` y haz clic en el botón **Conectar** (arriba a la izquierda).
2. En la pestaña **Conexión de la instancia EC2** presiona el botón **Conectar** abajo.
3. Se abrirá automáticamente la terminal negra de comandos de Ubuntu en tu navegador.

---

## 4. Comandos directos en la Terminal de AWS (Pantalla Negra)

Copia y pega estos comandos uno a uno en la terminal de AWS:

### Paso 4.1: Actualizar el servidor
```bash
sudo apt-get update -y
```

### Paso 4.2: Instalar el gestor de versiones NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Paso 4.3: Instalar Node.js versión 22
```bash
nvm install 22
node -v
npm -v
```

### Paso 4.4: Clonar tu proyecto de GitHub
```bash
git clone https://github.com/drkFenix/FS2_S04_G8.git
```

### Paso 4.5: Entrar a la carpeta e instalar librerías
```bash
cd FS2_S04_G8/huertohogar-app
npm install
```

### Paso 4.6: Dejar la aplicación corriendo permanentemente con PM2
```bash
npm install -g pm2
pm2 start "npm start" --name "huertohogar"
```

---

## 5. Abrir la Aplicación en el Navegador

Copia la IP pública que aparece en el panel de AWS (o en la barra inferior de la terminal) y ábrela en tu navegador:

```text
http://TU-IP-PUBLICA:3000
```

> **¡Ojo con el enlace!**  
> ❌ **INCORRECTO:** `https://34.230.35.62:3000` (dará error ERR_SSL_PROTOCOL_ERROR por la letra "s")  
> ✅ **CORRECTO:** `http://34.230.35.62:3000` (sin la letra "s")
