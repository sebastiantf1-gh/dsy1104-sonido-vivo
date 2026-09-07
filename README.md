#  Sonido Vivo

Proyecto semestral de la asignatura **Desarrollo Fullstack II (DSY1104)**.
Caso de negocio: **Tienda de Instrumentos y Equipos Musicales "Sonido Vivo"**, ubicada en Viña del Mar, Región de Valparaíso.

Sitio web construido con **HTML, CSS y JavaScript puro (Vanilla JS)**, que simula el frontend de una tienda de instrumentos musicales con catálogo de productos, gestión de usuarios y un panel de administración.

---

##  Descripción del proyecto

Sonido Vivo es una tienda dedicada a la venta de instrumentos musicales y equipos de sonido (guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos, accesorios y equipo de estudio/grabación). El sitio contempla dos perfiles de uso:

- **Cliente:** navega el catálogo, revisa el detalle de productos, agrega ítems al carrito de compras, se registra e inicia sesión, y puede leer el blog y contactar a la tienda.
- **Administrador:** cuenta con un panel (dashboard) para gestionar el inventario de productos (crear, editar, mostrar) y la gestión de usuarios (crear, editar, listar, mostrar detalle).

##  Funcionalidades principales

- **Catálogo dinámico:** los productos se renderizan en pantalla a partir de un arreglo de objetos JavaScript (no hay backend/base de datos; los datos son estáticos dentro del código).
- **Carrito de compras:** agregar productos al carrito con persistencia en `localStorage` (clave `carritoSonidoVivo`) y contador de ítems en el header.
- **Autenticación (simulada):** formularios de **login** y **registro de usuario** con validaciones en JavaScript (formato de correo institucional/gmail, largo de contraseña, confirmación de contraseña, región/comuna dependientes, etc.).
- **Panel de administración:**
  - Dashboard / Home administrativo.
  - Inventario de productos con tabla dinámica.
  - Crear, editar y mostrar el detalle de un producto.
  - Listado, creación, edición y detalle de usuarios.
- **Blog:** listado de artículos (`blogs.html`) con vistas de detalle individuales.
- **Formulario de contacto** con validación de campos.
- **Diseño responsivo** mediante hoja de estilos propia (`css/style.css`).

## Estructura del proyecto

```
dsy1104-sonido-vivo/
├── index.html                     # Página de inicio / landing con categorías
├── catalogo.html                  # Catálogo de productos
├── detalle-producto.html          # Detalle de un producto
├── login.html                     # Inicio de sesión
├── registro-usuario.html          # Registro de nuevos usuarios
├── nosotros.html                  # Información de la empresa
├── contacto.html                  # Formulario de contacto
├── blogs.html                     # Listado de artículos del blog
├── detalle-blog1.html             # Detalle artículo 1
├── detalle-blog2.html             # Detalle artículo 2
├── listado-usuario.html           # Listado de usuarios (vista cliente/admin)
│
├── admin-home.html                # Home del panel de administración
├── admin-dashboard.html           # Dashboard administrativo
├── admin-inventario.html          # Tabla de inventario de productos
├── admin-crear-producto.html      # Formulario para crear producto
├── admin-editar-producto.html     # Formulario para editar producto
├── admin-mostrar-producto.html    # Vista detalle de producto (admin)
├── admin-crear-usuario.html       # Formulario para crear usuario
├── admin-editar-usuario.html      # Formulario para editar usuario
├── admin-mostrar-usuario.html     # Vista detalle de usuario (admin)
│
├── css/
│   └── style.css                  # Estilos generales del sitio
├── js/
│   └── funciones.js               # Lógica de catálogo, carrito, formularios y CRUD (admin)
└── img/                           # Imágenes de productos, blog y logo
```

##  Tecnologías utilizadas

- **HTML5** – estructura semántica de las páginas.
- **CSS3** – estilos y diseño responsivo.
- **JavaScript (ES6+)** – lógica de interfaz, validación de formularios, renderizado dinámico y manejo de `localStorage`.
- Sin frameworks ni dependencias externas: el proyecto corre 100% en el navegador.

##  Cómo ejecutar el proyecto

No requiere instalación ni servidor backend. Basta con:

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` directamente en el navegador,

   **o bien**, para evitar problemas con rutas relativas, levantar un servidor local simple, por ejemplo:

   ```bash
   # Con Python 3
   python3 -m http.server 5500

   # o con la extensión "Live Server" de VS Code
   ```
3. Navegar a `http://localhost:5500` (o la URL que indique tu servidor).

## Datos de prueba

El login y registro validan formato, pero **no verifican contra un backend real**: al pasar las validaciones del formulario, se muestra un mensaje de confirmación en pantalla. El correo debe pertenecer a alguno de estos dominios:

- `@duoc.cl`
- `@profesor.duoc.cl`
- `@gmail.com`

La contraseña debe tener entre 4 y 10 caracteres.

## Notas y alcances del proyecto

- Es un proyecto **académico/frontend**: los datos de productos, usuarios e inventario están **hardcodeados** en `js/funciones.js` (no hay conexión a una base de datos ni API real).
- El carrito de compras persiste en el `localStorage` del navegador; el resto de las operaciones (crear/editar producto o usuario) no persisten entre sesiones.
- Pensado como entregable de la evaluación parcial de la asignatura **Desarrollo Fullstack II (DSY1104)**.

## Información de contacto (ficticia)

- 📍 Viña del Mar, Región de Valparaíso.
- 🕒Lunes a Viernes de 9:00 a 18:00 hrs.

## Licencia
Proyecto desarrollado con fines educativos para la asignatura DSY1104 – Desarrollo Fullstack II.
