const formulario = document.querySelector('#form-contacto');
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (formulario) {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const camposObligatorios = formulario.querySelectorAll('[required]');
        let formularioValido = true;

        camposObligatorios.forEach(function (campo) {
            if (campo.value.trim() === '') {
                campo.classList.add('campo-error');
                formularioValido = false;
            } else {
                campo.classList.remove('campo-error');
            }
        });

        const correo = document.querySelector('#correo');
        if (!patronCorreo.test(correo.value.trim())) {
            correo.classList.add('campo-error');
            formularioValido = false;
        }

        const mensajeConfirmado = document.querySelector('#mensaje-confirmado');
        mensajeConfirmado.textContent = formularioValido ? 'Consulta recibida.' : '';
    });
}
//Logica para el LOGIN.HTML 

const formularioLogin = document.querySelector('#login');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();

        const correoLogin = document.querySelector('#correo-login');
        const contrasena = document.querySelector('#contrasena');
        let formularioLoginValido = true;
        const patronCorreoLogin = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (!patronCorreoLogin.test(correoLogin.value.trim()) || correoLogin.value.length > 100) {
            correoLogin.classList.add('campo-error');
            document.querySelector('#error-correo').textContent = "Formato de correo no valido"
            formularioLoginValido = false;
        } else {
            correoLogin.classList.remove('campo-error');
            document.querySelector('#error-correo').textContent = ''
        }

        if (contrasena.value.length < 4 || contrasena.value.length > 10) {
            contrasena.classList.add('campo-error');
            document.querySelector('#error-contrasena').textContent = "La cantidad de caracteres es entre 4 y 10"
            formularioLoginValido = false;
        } else {
            contrasena.classList.remove('campo-error')
            document.querySelector('#error-contrasena').textContent = ''
        }

        if (formularioLoginValido) {
            document.querySelector('#mensaje-confirmacion').textContent = 'Inicia sesion correctamente'
        }


    });
}