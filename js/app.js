const API_URL = 'https://enebro-api.vercel.app';

async function cargarProductos() {
    const response = await fetch(`${API_URL}/api/productos`);

    if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
    }

    return await response.json();
}

async function mostrarProductos() {
    try {
        const productos = await cargarProductos();

        const contenedor = document.getElementById('productos');

        contenedor.innerHTML = productos.map(producto => `
            <article class="producto">
                <h2>${producto.name}</h2>
                <p>${producto.description ?? ''}</p>
                <p>$${producto.price}</p>
            </article>
        `).join('');

    } catch (error) {
        console.error(error);
    }
}

mostrarProductos();
