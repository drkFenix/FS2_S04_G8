// Esperar a que el DOM esté completamente cargado!
document.addEventListener("DOMContentLoaded", function() {
    const formularioRegistro = document.getElementById("registroForm");
    const formularioLogin = document.getElementById("loginForm");

    // Función para manejar el evento submit del formulario de registro!
    if (formularioRegistro) {
        formularioRegistro.addEventListener("submit", function(evento) {
            evento.preventDefault();
            
            let esValido = true;

            // Validar el nombre!
            const nombre = document.getElementById("nombre").value.trim();
            const errorNombre = document.getElementById("errorNombre");
            if (nombre.length < 3) {
                errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
                esValido = false;
            } else {
                errorNombre.textContent = "";
            }

            // Validar el correo electrónico!
            const email = document.getElementById("email").value.trim();
            const errorEmail = document.getElementById("errorEmail");
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                errorEmail.textContent = "Por favor, ingresa un correo electrónico válido.";
                esValido = false;
            } else {
                errorEmail.textContent = "";
            }

            // Validar la contraseña!
            const password = document.getElementById("password").value;
            const errorPassword = document.getElementById("errorPassword");
            if (password.length < 8) {
                errorPassword.textContent = "La contraseña debe tener al menos 8 caracteres.";
                esValido = false;
            } else {
                errorPassword.textContent = "";
            }

            // Función para procesar el envío si todo es válido y redirigir a exito!
            if (esValido) {
                window.location.href = "exito.html";
            }
        });
    }

    // Función para manejar el evento submit del formulario de login!
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", function(evento) {
            evento.preventDefault();
            
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const errorEmail = document.getElementById("errorLoginEmail");
            const errorPassword = document.getElementById("errorLoginPassword");
            
            // Limpiar errores!
            errorEmail.textContent = "";
            errorPassword.textContent = "";

            let esValido = true;

            if (!email) {
                errorEmail.textContent = "Ingresa tu correo electrónico.";
                esValido = false;
            }
            
            if (!password) {
                errorPassword.textContent = "Ingresa tu contraseña.";
                esValido = false;
            }

            // Validar contra el usuario de prueba!
            if (esValido) {
                if (email === "prueba@huertohogar.cl" && password === "secreto123") {
                    alert("¡Bienvenido nuevamente a HuertoHogar!");
                    window.location.href = "index.html";
                } else {
                    errorPassword.textContent = "Correo o contraseña incorrectos.";
                }
            }
        });
    }
});
