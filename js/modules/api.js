/**
 * Módulo de API para comunicación con el backend
 */

const API_URL = 'https://enebro-api.vercel.app';

// Categorías por defecto en caso de error de CORS
const DEFAULT_CATEGORIES = [
    { id: '1', name: 'Velas' },
    { id: '2', name: 'Difusores' },
    { id: '3', name: 'Aromatizantes' },
    { id: '4', name: 'Accesorios' }
];

/**
 * Obtiene la lista de productos
 * @returns {Promise<Array>} Lista de productos
 */
async function get_products() {
    try {
        const response = await fetch(`${API_URL}/api/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit'
        });
        
        if (!response.ok) {
            console.warn(`Respuesta no OK al obtener productos: ${response.status} ${response.statusText}`);
            console.log('Usando Mock API para productos...');
            return await mockGetProducts();
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error en get_products (CORS o conexión):', error.message);
        console.log('Usando Mock API para productos...');
        // Usar Mock API como fallback
        return await mockGetProducts();
    }
}

/**
 * Obtiene la lista de categorías
 * @returns {Promise<Array>} Lista de categorías
 */
async function get_categories() {
    try {
        const response = await fetch(`${API_URL}/api/categorias`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'omit'
        });
        
        if (!response.ok) {
            console.warn(`Respuesta no OK al obtener categorías: ${response.status} ${response.statusText}`);
            return DEFAULT_CATEGORIES;
        }
        
        const data = await response.json();
        return Array.isArray(data) ? data : DEFAULT_CATEGORIES;
    } catch (error) {
        console.error('Error en get_categories (usando categorías por defecto):', error.message);
        // Retornar categorías por defecto en caso de error CORS
        return DEFAULT_CATEGORIES;
    }
}

/**
 * Crea un nuevo producto
 * @param {Object} productData - Datos del producto
 * @param {string} productData.p_name - Nombre del producto
 * @param {string} [productData.p_description] - Descripción del producto
 * @param {string} [productData.p_imgsrc] - URL de la imagen
 * @param {string} [productData.p_category_id] - ID de la categoría
 * @param {string} [productData.p_sku] - SKU del producto
 * @param {number} [productData.p_price] - Precio del producto
 * @param {Array<string>} [productData.p_aroma] - Array de aromas
 * @param {Array<string>} [productData.p_color] - Array de colores
 * @returns {Promise<Object>} Producto creado
 */
async function create_product(productData) {
    try {
        const response = await fetch(`${API_URL}/api/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            console.warn(`Error al crear producto en API: ${response.statusText}`);
            console.log('Usando Mock API para crear producto...');
            return await mockCreateProduct(productData);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en create_product:', error.message);
        console.log('Usando Mock API para crear producto...');
        // Usar Mock API como fallback
        return await mockCreateProduct(productData);
    }
}

/**
 * Actualiza un producto existente
 * @param {string} productId - ID del producto
 * @param {Object} productData - Datos a actualizar
 * @returns {Promise<Object>} Producto actualizado
 */
async function update_product(productId, productData) {
    try {
        const response = await fetch(`${API_URL}/api/productos/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            console.warn(`Error al actualizar producto en API: ${response.statusText}`);
            console.log('Usando Mock API para actualizar producto...');
            return await mockUpdateProduct(productId, productData);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en update_product:', error.message);
        console.log('Usando Mock API para actualizar producto...');
        // Usar Mock API como fallback
        return await mockUpdateProduct(productId, productData);
    }
}

/**
 * Elimina un producto
 * @param {string} productId - ID del producto
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function delete_product(productId) {
    try {
        const response = await fetch(`${API_URL}/api/productos/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            console.warn(`Error al eliminar producto en API: ${response.statusText}`);
            console.log('Usando Mock API para eliminar producto...');
            return await mockDeleteProduct(productId);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en delete_product:', error.message);
        console.log('Usando Mock API para eliminar producto...');
        // Usar Mock API como fallback
        return await mockDeleteProduct(productId);
    }
}
