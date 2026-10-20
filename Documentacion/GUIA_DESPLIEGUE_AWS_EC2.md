# Guía Paso a Paso: Despliegue de HuertoHogar en AWS EC2 (AWS Academy)

Esta guía documenta el procedimiento directo, limpio y sin errores para crear la máquina virtual en AWS y levantar el proyecto **HuertoHogar (React + Bootstrap)** accesible desde cualquier navegador.

---

## 1. ¿Por qué se usa la IP `http://34.230.35.62:3000`?

* **¿Qué es esa IP?**  
  Cada vez que lanzas un servidor (EC2) en AWS, Amazon le asigna una **Dirección IPv4 Pública** única en todo el mundo (en tu caso fue `34.230.35.62`).
* **¿Por qué el `:3000` al final?**  
  Nuestra aplicación React está configurada para escuchar peticiones en el **puerto 3000**.
* **Diferencia entre IP Pública e IP Privada:**  
  * **IP Pública (`34.230.35.62`):** Es la puerta hacia internet. Cualquier persona o tu profesor puede ingresar a ella.
  * **IP Privada (`172.31.23.247`):** Es de uso exclusivo interno dentro de los servidores de Amazon. No abre en el navegador común.
* **Nota importante de AWS Academy:**  
  Si detienes el laboratorio (*Stop Lab*) o terminas la sesión, al volver a iniciarlo AWS podría asignarle una nueva IP pública. Solo debes copiar la nueva IP pública de tu instancia y colocarle `:3000`.

---

## 2. Paso a Paso en la Consola de AWS (Crear la Instancia)

### A. Iniciar el Laboratorio
1. Entrar a **AWS Academy** > **Laboratorio de aprendizaje (Learner Lab)**.
2. Hacer clic en **Start Lab** y esperar a que el círculo junto a **AWS** pase a color verde 🟢.
3. Hacer clic en **AWS** para abrir la consola de administración.

---

### B. Lanzar la Instancia EC2
1. En el buscador superior de AWS, escribir **EC2** e ingresar.
2. En el panel izquierdo, ir a **Instancias** y presionar el botón naranja **Lanzar instancias** (*Launch instance*).
3. Configurar exactamente los siguientes parámetros:

| Sección | Parámetro a configurar | Valor a ingresar / seleccionar |
| :--- | :--- | :--- |
| **Nombre y etiquetas** | Nombre | `reactBootstrap` |
| **Imágenes de aplicaciones (AMI)** | Sistema Operativo | Clic en el recuadro **Ubuntu** |
| | Versión de Ubuntu | `Ubuntu Server 22.04 LTS` o `Ubuntu Server 24.04 LTS` |
| **Tipo de instancia** | Tipo de servidor | `t2.micro` (o `t3.micro`) - Apto para la capa gratuita |
| **Par de claves (Key Pair)** | Nombre del par de claves | Clic en *Crear un nuevo par de claves* -> Nombre: `userReact`, tipo RSA, formato `.pem` (se descarga automáticamente a tu PC) |
| **Configuraciones de red** | Casillas rápidas | Marcar ✅ **Permitir tráfico HTTPS** y ✅ **Permitir tráfico HTTP** |
| | Editar grupo de seguridad | Clic en el botón blanco **Editar** arriba a la derecha |
| | Regla de puerto 3000 | Clic en **Agregar regla de grupo de seguridad**:<br>• **Tipo:** `TCP personalizado`<br>• **Rango de puertos:** `3000`<br>• **Tipo de origen:** `Cualquier lugar` (`0.0.0.0/0`) |
| **Almacenamiento** | Tamaño de disco | Cambiar de `8 GiB` a **`20 GiB`** (gp2 o gp3) |

4. Presionar el botón naranja **Lanzar instancia**.
5. Esperar unos segundos hasta ver el aviso verde de confirmación y hacer clic en **Ver todas las instancias**.

---

## 3. Conexión a la Máquina Virtual

1. En la lista de instancias de EC2, hacer clic sobre la instancia `reactBootstrap`.
2. Presionar el botón **Conectar** (arriba a la izquierda).
3. En la pestaña **Conexión de la instancia EC2** (EC2 Instance Connect), presionar el botón **Conectar** abajo a la derecha.
4. Se abrirá una pestaña con una **terminal negra de Ubuntu** en el navegador.

---

## 4. Comandos a Ejecutar en la Terminal de AWS

*(Copiar y pegar en orden uno por uno en la pantalla negra de AWS)*

### Paso 4.1: Actualizar el servidor
```bash
sudo apt-get update -y
```

### Paso 4.2: Instalar NVM (Gestor de versiones de Node)
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

### Paso 4.4: Clonar el proyecto desde GitHub
```bash
git clone https://github.com/drkFenix/FS2_S04_G8.git
```

### Paso 4.5: Entrar a la carpeta de la app e instalar librerías
```bash
cd FS2_S04_G8/huertohogar-app
npm install
```

### Paso 4.6: Iniciar la aplicación
* **Modo temporal (para probar en el momento):**
  ```bash
  npm start
  ```
  *(Para detenerlo se presiona `Ctrl + C`).*

* **Modo permanente (para que NUNCA se apague, incluso si cierras la ventana):**
  ```bash
  npm install -g pm2
  pm2 start "npm start" --name "huertohogar"
  ```

---

## 5. Probar el Resultado en el Navegador

1. Ve a la consola de AWS EC2 y copia la **Dirección IPv4 pública** de tu instancia (ejemplo: `34.230.35.62`).
2. Abre una pestaña en tu navegador e ingresa:
   ```text
   http://TU_IP_PUBLICA:3000
   ```
   *(Ejemplo real: `http://34.230.35.62:3000`)*

¡Listo! La tienda HuertoHogar estará disponible y funcionando en la nube de AWS.
