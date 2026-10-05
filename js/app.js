/**
 * Script principal de la Tienda
 */

/**
 * Inicializa la tienda
 */
async function inicializarTienda() {
    try {
        // Cargar productos
        await productManager.cargarProductos();

        // Mostrar productos
        mostrarProductos();

        console.log('Tienda inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar tienda:', error);
        mostrarError('Error al cargar los productos');
    }
}

/**
 * Muestra los productos en la tienda
 */
function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    const productos = productManager.obtenerTodosProductos();

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="sin-productos">No hay productos disponibles</p>';
        return;
    }

    contenedor.innerHTML = productos.map(producto => `
        <article class="producto">
            <img src="${producto.imgsrc || 'https://via.placeholder.com/250'}" alt="${producto.name}" class="producto-imagen">
            <h2>${producto.name}</h2>
            <p class="producto-descripcion">${producto.description ?? ''}</p>
            <div class="producto-info">
                <span class="producto-precio">$${parseFloat(producto.price).toFixed(2)}</span>
                ${producto.sku ? `<span class="producto-sku">SKU: ${producto.sku}</span>` : ''}
            </div>
            ${producto.aroma && producto.aroma.length > 0 ? `
                <div class="producto-aromas">
                    <strong>Aromas:</strong> ${producto.aroma.join(', ')}
                </div>
            ` : ''}
            ${producto.color && producto.color.length > 0 ? `
                <div class="producto-colores">
                    <strong>Colores:</strong> ${producto.color.join(', ')}
                </div>
            ` : ''}
        </article>
    `).join('');
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarTienda);
