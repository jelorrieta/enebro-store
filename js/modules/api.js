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
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en get_products:', error);
        // Retornar array vacío en caso de error
        return [];
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
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en get_categories (usando categorías por defecto):', error);
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
            throw new Error(`Error al crear producto: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en create_product:', error);
        throw error;
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
            throw new Error(`Error al actualizar producto: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en update_product:', error);
        throw error;
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
            throw new Error(`Error al eliminar producto: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en delete_product:', error);
        throw error;
    }
}
