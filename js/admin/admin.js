/**
 * Script principal del Administrador de Productos
 */

// Variables globales
let productoEnEdicion = null;

/**
 * Inicializa la aplicación del administrador
 */
async function inicializarAdmin() {
    try {
        // Cargar categorías y productos
        const categorias = await productManager.cargarCategorias();
        const productos = await productManager.cargarProductos();

        // Configurar event listeners
        configurarEventListeners();

        // Llenar select de categorías
        llenarSelectCategorias();

        // Mostrar productos
        mostrarProductos();

        // Mostrar advertencia si no hay conexión a API
        if (categorias.length === 0 || productos.length === 0) {
            mostrarAdvertencia('Nota: Trabajando sin conexión a la API. Algunos datos pueden no estar disponibles.');
        }

        console.log('Administrador inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar administrador:', error);
        mostrarAdvertencia('Advertencia: Algunos datos pueden no estar disponibles. Verifica tu conexión a internet.');
    }
}

/**
 * Configura los event listeners
 */
function configurarEventListeners() {
    // Formulario de crear producto
    const formCrear = document.getElementById('formCrearProducto');
    if (formCrear) {
        formCrear.addEventListener('submit', manejarCrearProducto);
    }

    // Búsqueda
    const inputBuscar = document.getElementById('buscar');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', (e) => {
            productManager.filtrarPorBusqueda(e.target.value);
            mostrarProductos();
        });
    }

    // Filtro de categoría
    const selectCategoria = document.getElementById('filtroCategoria');
    if (selectCategoria) {
        selectCategoria.addEventListener('change', (e) => {
            productManager.filtrarPorCategoria(e.target.value);
            mostrarProductos();
        });
    }
}

/**
 * Llena el select de categorías
 */
function llenarSelectCategorias() {
    const selectCategoria = document.getElementById('categoria');
    const selectFiltro = document.getElementById('filtroCategoria');
    const categorias = productManager.obtenerCategorias();

    if (selectCategoria) {
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.name;
            selectCategoria.appendChild(option);
        });
    }

    if (selectFiltro) {
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.name;
            selectFiltro.appendChild(option);
        });
    }
}

/**
 * Maneja el envío del formulario de crear producto
 */
async function manejarCrearProducto(e) {
    e.preventDefault();

    try {
        // Obtener datos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: document.getElementById('precio').value,
            sku: document.getElementById('sku').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value,
            aromas: document.getElementById('aromas').value,
            colores: document.getElementById('colores').value
        };

        // Validar datos requeridos
        if (!datos.nombre || !datos.precio) {
            mostrarError('El nombre y precio son requeridos');
            return;
        }

        // Crear producto
         await productManager.crearProducto(datos);

         // Limpiar formulario
         document.getElementById('formCrearProducto').reset();

         // Refrescar listado desde la API
         await refrescarProductos();

         // Mostrar mensaje de éxito
         mostrarExito('Producto creado correctamente');
    } catch (error) {
        console.error('Error al crear producto:', error);
        mostrarError('Error al crear el producto');
    }
}

/**
 * Muestra la lista de productos
 */
function mostrarProductos() {
    const contenedor = document.getElementById('listaProductos');
    const productos = productManager.obtenerProductosFiltrados();

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="sin-productos">No hay productos para mostrar</p>';
        return;
    }

    contenedor.innerHTML = `
        <table class="tabla-productos-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>SKU</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map(producto => {
                    // Validar y formatear datos
                    const nombre = producto.name || 'Sin nombre';
                    const descripcion = producto.description ? producto.description.substring(0, 50) + '...' : '-';
                    const categoria = productManager.obtenerNombreCategoria(producto.category_id);
                    const precio = producto.price && !isNaN(parseFloat(producto.price)) ? `$${parseFloat(producto.price).toFixed(2)}` : '$0.00';
                    const sku = producto.sku || '-';
                    
                    return `
                        <tr class="producto-fila" data-id="${producto.id}">
                            <td class="producto-nombre">${nombre}</td>
                            <td class="producto-descripcion">${descripcion}</td>
                            <td class="producto-categoria">${categoria}</td>
                            <td class="producto-precio">${precio}</td>
                            <td class="producto-sku">${sku}</td>
                            <td class="producto-acciones">
                                <button class="btn btn-small btn-edit" onclick="editarProducto('${producto.id}')">Editar</button>
                                <button class="btn btn-small btn-delete" onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

/**
 * Edita un producto
 */
function editarProducto(productId) {
    const producto = productManager.obtenerProducto(productId);
    
    if (!producto) {
        mostrarError('Producto no encontrado');
        return;
    }

    // Llenar formulario con datos del producto
    document.getElementById('nombre').value = producto.name;
    document.getElementById('descripcion').value = producto.description || '';
    document.getElementById('precio').value = producto.price;
    document.getElementById('sku').value = producto.sku || '';
    document.getElementById('categoria').value = producto.category_id || '';
    document.getElementById('imagen').value = producto.imgsrc || '';
    document.getElementById('aromas').value = producto.aroma ? producto.aroma.join(', ') : '';
    document.getElementById('colores').value = producto.color ? producto.color.join(', ') : '';

    // Cambiar botón de envío
    const btnSubmit = document.querySelector('#formCrearProducto button[type="submit"]');
    btnSubmit.textContent = 'Actualizar Producto';
    btnSubmit.onclick = (e) => manejarActualizarProducto(e, productId);

    // Guardar ID del producto en edición
    productoEnEdicion = productId;

    // Scroll al formulario
    document.querySelector('.form-crear-producto').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Maneja la actualización de un producto
 */
async function manejarActualizarProducto(e, productId) {
    e.preventDefault();

    try {
        // Obtener datos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            precio: document.getElementById('precio').value,
            sku: document.getElementById('sku').value,
            categoria: document.getElementById('categoria').value,
            imagen: document.getElementById('imagen').value,
            aromas: document.getElementById('aromas').value,
            colores: document.getElementById('colores').value
        };

        // Validar datos requeridos
        if (!datos.nombre || !datos.precio) {
            mostrarError('El nombre y precio son requeridos');
            return;
        }

        // Actualizar producto
        await productManager.actualizarProducto(productId, datos);

        // Limpiar formulario
        document.getElementById('formCrearProducto').reset();
        productoEnEdicion = null;

        // Restaurar botón de envío
        const btnSubmit = document.querySelector('#formCrearProducto button[type="submit"]');
        btnSubmit.textContent = 'Crear Producto';
        btnSubmit.onclick = null;

        // Mostrar productos actualizados sin refrescar desde la API
        // ya que el producto ya fue actualizado en el array local
        mostrarProductos();

        // Mostrar mensaje de éxito
        mostrarExito('Producto actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        mostrarError('Error al actualizar el producto');
    }
}

/**
 * Elimina un producto
 */
async function eliminarProducto(productId) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }

    try {
        await productManager.eliminarProducto(productId);
        mostrarProductos();
        mostrarExito('Producto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        mostrarError('Error al eliminar el producto');
    }
}

/**
 * Muestra un mensaje de error
 */
function mostrarError(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-error';
    alerta.textContent = mensaje;
    document.body.insertBefore(alerta, document.body.firstChild);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

/**
 * Muestra un mensaje de éxito
 */
function mostrarExito(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-exito';
    alerta.textContent = mensaje;
    document.body.insertBefore(alerta, document.body.firstChild);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

/**
 * Muestra un mensaje de advertencia
 */
function mostrarAdvertencia(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alerta alerta-warning';
    alerta.textContent = mensaje;
    document.body.insertBefore(alerta, document.body.firstChild);

    setTimeout(() => {
        alerta.remove();
    }, 7000);
}

/**
 * Refresca el listado de productos desde la API
 */
async function refrescarProductos() {
    try {
        console.log('Iniciando refresh de productos...');
        
        // Recargar productos desde la API
        const productosActualizados = await productManager.cargarProductos();
        console.log('Productos cargados:', productosActualizados);
        
        // Limpiar filtros para mostrar todos los productos
        const inputBuscar = document.getElementById('buscar');
        const selectCategoria = document.getElementById('filtroCategoria');
        
        if (inputBuscar) {
            inputBuscar.value = '';
        }
        if (selectCategoria) {
            selectCategoria.value = '';
        }
        
        // Resetear filtros en el manager
        productManager.filtrarPorBusqueda('');
        productManager.filtrarPorCategoria('');
        
        // Mostrar productos actualizados
        mostrarProductos();
        console.log('Productos mostrados en la tabla');
    } catch (error) {
        console.error('Error al refrescar productos:', error);
        mostrarError('Error al refrescar el listado de productos');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAdmin);
