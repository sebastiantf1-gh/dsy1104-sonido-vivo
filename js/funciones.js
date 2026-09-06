/* ================================*/
/* ====== Logica de Catálogo ======*/
// 1. Arreglo de Productos
const catalogoSonidoVivo = [
    {
        codigo: 'GA001',
        categoria: 'Guitarras Acústicas',
        nombre: 'Guitarra Acústica Folk',
        marca: 'Yamaha',
        modelo: 'F310',
        stock: 8,
        precio: 129990,
        descripcion: 'Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.',
        imagen: 'img/yamaha-f310.png'
    },
    {
        codigo: 'GE001',
        categoria: 'Guitarras Eléctricas',
        nombre: 'Guitarra Eléctrica Stratocaster',
        marca: 'Squier',
        modelo: 'Affinity Strat',
        stock: 5,
        precio: 249990,
        descripcion: 'Cuerpo de álamo, mástil de arce, pastillas SSS.',
        imagen: 'img/squier-affiinity-strat.png'
    },
    {
        codigo: 'BA001',
        categoria: 'Bajos Eléctricos',
        nombre: 'Bajo Eléctrico 4 Cuerdas',
        marca: 'Squier',
        modelo: 'Affinity PJ',
        stock: 5,
        precio: 299990,
        descripcion: 'Pickup PJ, cuerpo álamo, mástil arce.',
        imagen: 'img/squier-affiinity-pj.png'
    },
    {
        codigo: 'BT001',
        categoria: 'Baterías',
        nombre: 'Batería Acústica 5 piezas',
        marca: 'Pearl',
        modelo: 'Roadshow',
        stock: 2,
        precio: 599990,
        descripcion: 'Incluye stands, platillos y pedal de bombo.',
        imagen: 'img/pearl-roadshow.png'
    },
    {
        codigo: 'TC001',
        categoria: 'Teclados y Pianos',
        nombre: 'Teclado Digital 61 teclas',
        marca: 'Yamaha',
        modelo: 'PSR-E373',
        stock: 4,
        precio: 249990,
        descripcion: '61 teclas sensibles al tacto, 622 voces',
        imagen: 'img/yamaha-psre373.png'
    },
    {
        codigo: 'AM001',
        categoria: 'Amplificadores',
        nombre: 'Amplificador Guitarra 15W',
        marca: 'Fender',
        modelo: 'Frontman 15G',
        stock: 5,
        precio: 99990,
        descripcion: '15W, distorsión incorporada, entrada auxiliar.',
        imagen: 'img/fender-frontman-15g.png'
    }
];

// 2. Inicialización del Carrito en LocalStorage
let carrito = JSON.parse(localStorage.getItem('carritoSonidoVivo')) || [];

// 3. Función para renderizar el catálogo en el HTML
function renderizarCatalogo() {
    const contenedor = document.getElementById('contenedor-productos');
    // Verifica si estamos en la página del catálogo antes de ejecutar
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Limpia el contenedor

    catalogoSonidoVivo.forEach(producto => {
        // Formateo del precio a CLP
        const precioCLP = new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(producto.precio);

        // Creación del HTML de la tarjeta
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('producto-catalogo');
        tarjeta.innerHTML = `
            <a  href="detalle-producto.html" class="enlace-detalle">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
            </a>
            <p class="precio">${precioCLP}</p>
            <p class="marca"><strong>Marca:</strong> ${producto.marca}</p>
            <p class="modelo"><strong>Modelo:</strong> ${producto.modelo}</p>
            <p class="descripcion">${producto.descripcion}</p>
            <p class="stock">Stock disponible: ${producto.stock}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito('${producto.codigo}')">
                Añadir al Carrito
            </button>
        `;
        contenedor.appendChild(tarjeta);
    });
    actualizarContadorCarrito();
}

// 4. Función para agregar productos al carrito
window.agregarAlCarrito = function (codigo) {
    const productoEncontrado = catalogoSonidoVivo.find(p => p.codigo === codigo);

    if (productoEncontrado) {
        // Verificar si ya existe en el carrito para sumar cantidad
        const itemEnCarrito = carrito.find(item => item.codigo === codigo);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }

        // Guardar en LocalStorage
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));

        // Alerta visual de confirmación para el usuario
        mostrarMensajeToast(`${productoEncontrado.nombre} añadido al carrito.`);
        actualizarContadorCarrito();
    }
};

// 4.1 Función para crear y mostrar la notificación en pantalla
function mostrarMensajeToast(mensaje) {
    // Crear el div del mensaje
    const toast = document.createElement('div');
    toast.classList.add('toast-mensaje');
    toast.textContent = mensaje;

    // Añadirlo al body
    document.body.appendChild(toast);

    // Eliminarlo del HTML después de 3 segundos para no acumular basura en el DOM
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 5. Función para actualizar el contador del carrito en el Header
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        // Suma la cantidad total de items, no solo los tipos de productos
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}

// 6. Cargar el catálogo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderizarCatalogo);



/* ===============================================*/
/* ====== Logica de Contacto: Validaciones ======*/
const formularioContacto = document.querySelector('#form-contacto');

if (formularioContacto) {
    formularioContacto.addEventListener('submit', function (e) {
        // Prevenir el envío automático del formulario
        e.preventDefault();

        // 1. Capturar los campos del formulario
        const nombre = document.querySelector('#nombre');
        const correo = document.querySelector('#correo');
        const comentario = document.querySelector('#comentario');

        // 2. Capturar las cajas de texto para los errores
        const errorNombre = document.querySelector('#error-nombre');
        const errorCorreo = document.querySelector('#error-correo');
        const errorComentario = document.querySelector('#error-comentario');
        const mensajeConfirmado = document.querySelector('#mensaje-confirmado');

        // 3. Variable de control
        let formularioValido = true;

        // Limpiar mensajes y clases de error antes de cada validación
        [nombre, correo, comentario].forEach(campo => campo.classList.remove('campo-error'));
        errorNombre.textContent = '';
        errorCorreo.textContent = '';
        errorComentario.textContent = '';
        mensajeConfirmado.textContent = '';

        // --- validacion del nombre ---
        if (nombre.value.trim() === '') {
            nombre.classList.add('campo-error');
            errorNombre.textContent = 'El nombre es obligatorio.';
            formularioValido = false;
        } else if (nombre.value.length > 100) {
            nombre.classList.add('campo-error');
            errorNombre.textContent = 'El nombre no puede superar los 100 caracteres.';
            formularioValido = false;
        }

        // --- validacion del correo ---
        // Expresión regular que obliga a usar solo los dominios permitidos
        const patronCorreoPermitido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (correo.value.trim() === '') {
            correo.classList.add('campo-error');
            errorCorreo.textContent = 'El correo es obligatorio.';
            formularioValido = false;
        } else if (correo.value.length > 100) {
            correo.classList.add('campo-error');
            errorCorreo.textContent = 'El correo no puede superar los 100 caracteres.';
            formularioValido = false;
        } else if (!patronCorreoPermitido.test(correo.value.trim())) {
            correo.classList.add('campo-error');
            errorCorreo.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
            formularioValido = false;
        }

        // --- validacion del comentario ---
        if (comentario.value.trim() === '') {
            comentario.classList.add('campo-error');
            errorComentario.textContent = 'Debe ingresar un mensaje o comentario.';
            formularioValido = false;
        } else if (comentario.value.length > 500) {
            comentario.classList.add('campo-error');
            errorComentario.textContent = 'El comentario no puede superar los 500 caracteres.';
            formularioValido = false;
        }

        // --- resultado final ---
        if (formularioValido) {
            mensajeConfirmado.textContent = 'Consulta enviada con éxito.';
            formularioContacto.reset(); // Limpia el formulario después de un envío exitoso
        }
    });
}

//Arreglo de objetos(inventario)
const productos = [
    {
        codigoProducto: '001',
        nombreProducto: 'Guitarra Eléctrica Fender Stratocaster',
        descripcionProducto: 'Guitarra eléctrica de cuerpo sólido con pastillas de bobina simple y puente de trémolo.',
        precioProducto: 699990,
        stock: 10,
        stockCritico: 3,
        categoria: 'Instrumentos de Cuerda',
        imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_995530-MLA91393909737_092025-F.webp'
    },
    {
        codigoProducto: '002',
        nombreProducto: 'Bajo Eléctrico Fender Jazz Bass',
        descripcionProducto: 'Bajo eléctrico de 4 cuerdas, cuerpo de aliso y dos pastillas de bobina simple para un sonido clásico y versátil.',
        precioProducto: 849990,
        stock: 5,
        stockCritico: 2,
        categoria: 'Instrumentos de Cuerda',
        imagen: 'https://www.mercadolibre.cl/squier-by-fender-bajo-electrico-affinity-jazz-bass/p/MLC22814045?pdp_filters=item_id%3AMLC2879319526&from=gshop&matt_tool=95488771&matt_word=&matt_source=google&matt_campaign_id=23496417535&matt_ad_group_id=192538759176&matt_match_type=&matt_network=g&matt_device=c&matt_creative=794255798093&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735115857&matt_product_id=MLC22814045-product&matt_product_partition_id=2495031135771&matt_target_id=pla-2495031135771&cq_src=google_ads&cq_cmp=23496417535&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=23496417535&gbraid=0AAAAADxxu6r25MhvXCR8mvVmkxo2Jl4Yw&gclid=Cj0KCQjw2OnUBhC2ARIsACKyfaHqlHQghWEIzWhn858tXp68eH5eO1cV-3KCWuM_av1APQNFj9z6SZMaAnZIEALw_wcB#&gid=1&pid=1'
    },

    {
        codigoProducto: '003',
        nombreProducto: 'Guitarra Acústica Taylor 114e',
        descripcionProducto: 'Guitarra acústica electrificada con cuerpo Grand Auditorium, tapa de abeto macizo y electrónica Expression System 2.',
        precioProducto: 929990,
        stock: 4,
        stockCritico: 4,
        categoria: 'Instrumentos de Cuerda',
        imagen: 'https://casamarilla.cl/image/data/imagenesweb/gs-mini-mahogany.jpg'
    },

    {
        codigoProducto: '004',
        nombreProducto: 'Amplificador de Guitarra Fender Champion 40',
        descripcionProducto: 'Amplificador combo de 40 vatios con un altavoz de 12 pulgadas, efectos integrados y emuladores de voz de amplificador.',
        precioProducto: 249990,
        stock: 12,
        stockCritico: 4,
        categoria: 'Amplificadores',
        imagen: 'https://audiomusicacl.vtexassets.com/arquivos/ids/196090-1200-1200?v=638700452168030000&width=1200&height=1200&aspect=true'
    }
]

//Logica para el login.HTML 

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
            document.querySelector('#error-correo').textContent = "Correo no valido"
            formularioLoginValido = false;
        } else {
            correoLogin.classList.remove('campo-error');
            document.querySelector('#error-correo').textContent = ''
        }

        if (contrasena.value.length < 4 || contrasena.value.length > 10) {
            contrasena.classList.add('campo-error');
            document.querySelector('#error-contrasena').textContent = "Contraseña no valida"
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
//Logica para el registro-usuario.HTML 
const formularioRegistro = document.querySelector('#registro');
if (formularioRegistro) {
    const region = document.querySelector('#region');
    const comuna = document.querySelector('#comuna');
    const comunasRegion = {
        'Metropolitana': ['Santiago'],
        'Araucania': ['Temuco'],
        'ñuble': ['Chillan']
    };
    region.addEventListener('change', function () {
        const regionSeleccionada = this.value;
        comuna.innerHTML = '<option value="">--Seleccione la comuna--</option>';

        if (regionSeleccionada && comunasRegion[regionSeleccionada]) {
            comunasRegion[regionSeleccionada].forEach(function (nombreComuna) {
                const opcion = document.createElement('option');
                opcion.value = nombreComuna;
                opcion.textContent = nombreComuna;
                comuna.appendChild(opcion);
            });
        }
    });
    formularioRegistro.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre');
        const correoRegistro = document.querySelector('#correo-registro');
        const contrasenaRegistro = document.querySelector('#contrasena-registro');
        const contrasenaCheck = document.querySelector('#contrasena-check');
        const region = document.querySelector('#region');
        const comuna = document.querySelector('#comuna');


        let formularioRegistroValido = true;
        const patronCorreoRegistro = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

        if (nombre.value.length > 50 || nombre.value.trim() === '') {
            nombre.classList.add('campo-error');
            document.querySelector('#error-nombre').textContent = "Supera la cantidad de caracteres minimos o esta vacio"
            formularioRegistroValido = false;
        } else {
            nombre.classList.remove('campo-error')
            document.querySelector('#error-nombre').textContent = ''
        }

        if (!patronCorreoRegistro.test(correoRegistro.value.trim()) || correoRegistro.value.length > 100) {
            correoRegistro.classList.add('campo-error');
            document.querySelector('#error-correo').textContent = "Formato de correo no valido"
            formularioRegistroValido = false;
        } else {
            correoRegistro.classList.remove('campo-error');
            document.querySelector('#error-correo').textContent = ''
        }

        if (contrasenaRegistro.value.length < 4 || contrasenaRegistro.value.length > 10) {
            contrasenaRegistro.classList.add('campo-error');
            document.querySelector('#error-contrasena-registro').textContent = "La cantidad de caracteres es entre 4 y 10"
            formularioRegistroValido = false;
        } else {
            contrasenaRegistro.classList.remove('campo-error')
            document.querySelector('#error-contrasena-registro').textContent = ''
        }

        if (contrasenaRegistro.value != contrasenaCheck.value) {
            contrasenaCheck.classList.add('campo-error');
            document.querySelector('#error-contrasena-check').textContent = "Las contrasenas deben coincidir"
            formularioRegistroValido = false;
        } else {
            contrasenaCheck.classList.remove('campo-error')
            document.querySelector('#error-contrasena-check').textContent = ''
        }

        if (region.value.trim() === '') {
            region.classList.add('campo-error');
            formularioRegistroValido = false;
        } else {
            region.classList.remove('campo-error');
        }

        if (comuna.value.trim() === '') {
            comuna.classList.add('campo-error');
            formularioRegistroValido = false;
        } else {
            comuna.classList.remove('campo-error');
        }

        if (formularioRegistroValido) {
            document.querySelector('#mensaje-confirmacion').textContent = 'Registrado correctamente'
        }
    })
}


//Logica para tabla de inventario
function cargarTablaInventario() {
    const cuerpoTabla = document.querySelector('#cuerpo-tabla-inventario');
    cuerpoTabla.innerHTML = ''; //limpia la tabla
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML =
            `<td>${producto.nombreProducto}</td>
        <td>${producto.codigoProducto}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precioProducto.toLocaleString('es-CL')}</td>
        <td class="stock-critico">${producto.stock}</td>
        <td>
            <button class="admin-btn-agregar">Agregar</button>
            <button class="admin-btn-editar">Editar</button>
            <button class="admin-btn-eliminar">Eliminar (1 unidad)</button>
        </td>`;
        if (producto.stock > producto.stockCritico) {
            fila.querySelector('.stock-critico').classList.remove('stock-critico');
        }
        cuerpoTabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', cargarTablaInventario);

//logica para el listado de usuarios 
const usuariosListado = [
    { fecha: '05/09/2026', orden: 'S01001', nombre: 'Benjamin Vasquez', estado: 'Completado', total: '$200.000' },
    { fecha: '04/09/2026', orden: 'S01002', nombre: 'Sebastian Toro', estado: 'Pendiente', total: '$10.000' },
    { fecha: '03/09/2026', orden: 'S01003', nombre: 'Camilo Vera', estado: 'Cancelado', total: '$2.500' }
]

function cargarListadoUsuarios() {
    const cuerpoTabla = document.querySelector('#tbody-user');
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = '';

    usuariosListado.forEach(item => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.fecha}</td>
            <td>${item.orden}</td>
            <td>${item.nombre}</td>
            <td>${item.estado}</td>
            <td>${item.total}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', cargarListadoUsuarios);

//logica para el admin-mostar-usuario
const usuarioDetalle =
{
    nombre: 'Benjamín Vasuqez', run: '204501807', correo: 'benjam@duoc.cl',
    telefono: '+56948999989', region: 'Metropolitana', comuna: 'Santiago',
    tipoUsuario: 'Administrador'
};
function cargarDetalleUsuario() {
    const nombreDetalle = document.querySelector('#nombre-detalle');
    if (!nombreDetalle) return;

    document.querySelector('#nombre-detalle').textContent = usuarioDetalle.nombre;
    document.querySelector('#run-detalle').textContent = usuarioDetalle.run;
    document.querySelector('#correo-detalle').textContent = usuarioDetalle.correo;
    document.querySelector('#telefono-detalle').textContent = usuarioDetalle.telefono;
    document.querySelector('#region-detalle').textContent = usuarioDetalle.region;
    document.querySelector('#comuna-detalle').textContent = usuarioDetalle.comuna;
    document.querySelector('#tipo-detalle').textContent = usuarioDetalle.tipoUsuario;
}

document.addEventListener('DOMContentLoaded', cargarDetalleUsuario);



document.addEventListener('DOMContentLoaded', cargarListadoUsuarios);
//Logica para el admin-crear-usuario.html
const formularioUsuario = document.querySelector('#registrar-usuario');
if (formularioUsuario) {
    const region = document.querySelector('#region-user');
    const comuna = document.querySelector('#comuna-user');
    const comunasRegion = {
        'Metropolitana': ['Santiago'],
        'Araucania': ['Temuco'],
        'ñuble': ['Chillan']
    };
    region.addEventListener('change', function () {
        const regionSeleccionada = this.value;
        comuna.innerHTML = '<option value="">--Seleccione la comuna--</option>';

        if (regionSeleccionada && comunasRegion[regionSeleccionada]) {
            comunasRegion[regionSeleccionada].forEach(function (nombreComuna) {
                const opcion = document.createElement('option');
                opcion.value = nombreComuna;
                opcion.textContent = nombreComuna;
                comuna.appendChild(opcion);
            });
        }
    });

    formularioUsuario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre-user');
        const correoRegistro = document.querySelector('#correo-user');
        const contrasenaRegistro = document.querySelector('#contrasena-user');
        const contrasenaCheck = document.querySelector('#contrasena-check-user');
        const region = document.querySelector('#region-user');
        const comuna = document.querySelector('#comuna-user');
        const run = document.querySelector('#run');
        const tipoUsuario = document.querySelector('#tipo-usuario');


        let formularioUserValido = true;
        const patronCorreoRegistro = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        const patronRun = /^[0-9]{7,8}[0-9kK]$/;
        if (nombre.value.length > 50 || nombre.value.trim() === '') {
            nombre.classList.add('campo-error');
            document.querySelector('#error-nombre').textContent = "Supera la cantidad de caracteres minimos o esta vacio"
            formularioUserValido = false;
        } else {
            nombre.classList.remove('campo-error')
            document.querySelector('#error-nombre').textContent = ''
        }
        if (!patronRun.test(run.value.trim())) {
            run.classList.add('campo-error');
            document.querySelector('#error-run').textContent = "Ingrese un RUN valido"
            formularioUserValido = false;
        } else {
            run.classList.remove('campo-error');
            document.querySelector('#error-run').textContent = '';
        }


        if (!patronCorreoRegistro.test(correoRegistro.value.trim()) || correoRegistro.value.length > 100) {
            correoRegistro.classList.add('campo-error');
            document.querySelector('#error-correo').textContent = "Formato de correo no valido"
            formularioUserValido = false;
        } else {
            correoRegistro.classList.remove('campo-error');
            document.querySelector('#error-correo').textContent = ''
        }

        if (contrasenaRegistro.value.length < 4 || contrasenaRegistro.value.length > 10) {
            contrasenaRegistro.classList.add('campo-error');
            document.querySelector('#error-contrasena-registro').textContent = "La cantidad de caracteres es entre 4 y 10"
            formularioUserValido = false;
        } else {
            contrasenaRegistro.classList.remove('campo-error')
            document.querySelector('#error-contrasena-user').textContent = ''
        }

        if (contrasenaRegistro.value != contrasenaCheck.value) {
            contrasenaCheck.classList.add('campo-error');
            document.querySelector('#error-contrasena-check-user').textContent = "Las contrasenas deben coincidir"
            formularioUserValido = false;
        } else {
            contrasenaCheck.classList.remove('campo-error')
            document.querySelector('#error-contrasena-check-user').textContent = ''
        }

        if (region.value.trim() === '') {
            region.classList.add('campo-error');
            formularioUserValido = false;
        } else {
            region.classList.remove('campo-error');
        }

        if (comuna.value.trim() === '') {
            comuna.classList.add('campo-error');
            formularioUserValido = false;
        } else {
            comuna.classList.remove('campo-error');
        }

        if (tipoUsuario.value.trim() === '') {
            tipoUsuario.classList.add('campo-error');
            formularioUserValido = false;
        } else {
            tipoUsuario.classList.remove('campo-error');
        }

        if (formularioUserValido) {
            document.querySelector('#mensaje-confirmacion').textContent = 'Registrado correctamente'
        }
    })
}