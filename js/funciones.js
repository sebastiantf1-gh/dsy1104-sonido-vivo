const formulario = document.querySelector('#form-contacto');
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const camposObligatorios = formulario.querySelectorAll('[required]');
    let formularioValido = true;

    camposObligatorios.forEach(function (campo){
        if (campo.value.trim() === ''){
            campo.classList.add('campo-error');
            formularioValido = false;
        }else{
            campo.classList.remove('campo-error');
        }
    });

    const correo = document.querySelector('#correo');
    if(!patronCorreo.test(correo.value.trim())) {
        correo.classList.add('campo-error');
        formularioValido=false;
    } 
    
    const mensajeConfirmado = document.querySelector('#mensaje-confirmado');
    mensajeConfirmado.textContent = formularioValido ? 'Consulta recibida.' : '';
});