const formulario = document.querySelector('#form-contacto');
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Arreglo de objetos(inventario)
const productos = [
    {codigoProducto:'001', 
    nombreProducto:'Guitarra Eléctrica Fender Stratocaster',
    descripcionProducto:'Guitarra eléctrica de cuerpo sólido con pastillas de bobina simple y puente de trémolo.',
    precioProducto: 699990,
    stock: 10,
    stockCritico: 3,
    categoria:'Instrumentos de Cuerda',
    imagen:'https://http2.mlstatic.com/D_NQ_NP_2X_995530-MLA91393909737_092025-F.webp'
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