/**
 * Mock API - Datos locales para desarrollo y pruebas
 * Simula las respuestas del backend
 */

// Datos de ejemplo para categorías
const mockCategories = [
    { id: '1', name: 'Velas' },
    { id: '2', name: 'Difusores' },
    { id: '3', name: 'Aromatizantes' },
    { id: '4', name: 'Accesorios' }
];

// Datos de ejemplo para productos
const mockProducts = [
    {
        id: '1',
        name: 'Vela Aromática Lavanda',
        description: 'Vela aromática hecha con cera natural y aceites esenciales de lavanda',
        price: 29.99,
        sku: 'VAL-001',
        imgsrc: 'https://via.placeholder.com/250?text=Vela+Lavanda',
        category_id: '1',
        aroma: ['Lavanda', 'Eucalipto'],
        color: ['Blanco', 'Púrpura']
    },
    {
        id: '2',
        name: 'Difusor de Aromas',
        description: 'Difusor ultrasónico con luz LED para aromaterapia',
        price: 45.99,
        sku: 'DIF-001',
        imgsrc: 'https://via.placeholder.com/250?text=Difusor',
        category_id: '2',
        aroma: ['Menta', 'Limón'],
        color: ['Blanco', 'Negro']
    },
    {
        id: '3',
        name: 'Spray Aromatizante',
        description: 'Spray aromatizante natural para ambientes',
        price: 15.99,
        sku: 'SPA-001',
        imgsrc: 'https://via.placeholder.com/250?text=Spray',
        category_id: '3',
        aroma: ['Rosa', 'Jazmín'],
        color: ['Rosa']
    },
    {
        id: '4',
        name: 'Quemador de Incienso',
        description: 'Quemador de incienso de cerámica artesanal',
        price: 22.99,
        sku: 'QUI-001',
        imgsrc: 'https://via.placeholder.com/250?text=Quemador',
        category_id: '4',
        aroma: ['Sándalo'],
        color: ['Blanco', 'Beige']
    }
];

// Almacenamiento local de productos (simula base de datos)
let localProducts = [...mockProducts];

/**
 * Mock: Obtiene la lista de productos
 * @returns {Promise<Array>} Lista de productos
 */
async function mockGetProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...localProducts]);
        }, 300);
    });
}

/**
 * Mock: Obtiene la lista de categorías
 * @returns {Promise<Array>} Lista de categorías
 */
async function mockGetCategories() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockCategories]);
        }, 200);
    });
}

/**
 * Mock: Crea un nuevo producto
 * @param {Object} productData - Datos del producto
 * @returns {Promise<Object>} Producto creado
 */
async function mockCreateProduct(productData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Validar datos requeridos
                if (!productData.p_name || !productData.p_price) {
                    reject(new Error('Nombre y precio son requeridos'));
                    return;
                }

                // Crear nuevo producto
                const newProduct = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: productData.p_name,
                    description: productData.p_description || null,
                    price: parseFloat(productData.p_price),
                    sku: productData.p_sku || null,
                    imgsrc: productData.p_imgsrc || 'https://via.placeholder.com/250',
                    category_id: productData.p_category_id || null,
                    aroma: productData.p_aroma || [],
                    color: productData.p_color || []
                };

                // Agregar a almacenamiento local
                localProducts.push(newProduct);

                resolve(newProduct);
            } catch (error) {
                reject(error);
            }
        }, 300);
    });
}

/**
 * Mock: Actualiza un producto existente
 * @param {string} productId - ID del producto
 * @param {Object} productData - Datos a actualizar
 * @returns {Promise<Object>} Producto actualizado
 */
async function mockUpdateProduct(productId, productData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Buscar producto
                const index = localProducts.findIndex(p => p.id === productId);
                if (index === -1) {
                    reject(new Error('Producto no encontrado'));
                    return;
                }

                // Actualizar producto
                const updatedProduct = {
                    ...localProducts[index],
                    name: productData.p_name || localProducts[index].name,
                    description: productData.p_description !== undefined ? productData.p_description : localProducts[index].description,
                    price: productData.p_price ? parseFloat(productData.p_price) : localProducts[index].price,
                    sku: productData.p_sku !== undefined ? productData.p_sku : localProducts[index].sku,
                    imgsrc: productData.p_imgsrc !== undefined ? productData.p_imgsrc : localProducts[index].imgsrc,
                    category_id: productData.p_category_id !== undefined ? productData.p_category_id : localProducts[index].category_id,
                    aroma: productData.p_aroma !== undefined ? productData.p_aroma : localProducts[index].aroma,
                    color: productData.p_color !== undefined ? productData.p_color : localProducts[index].color
                };

                localProducts[index] = updatedProduct;
                resolve(updatedProduct);
            } catch (error) {
                reject(error);
            }
        }, 300);
    });
}

/**
 * Mock: Elimina un producto
 * @param {string} productId - ID del producto
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function mockDeleteProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Buscar producto
                const index = localProducts.findIndex(p => p.id === productId);
                if (index === -1) {
                    reject(new Error('Producto no encontrado'));
                    return;
                }

                // Eliminar producto
                const deletedProduct = localProducts.splice(index, 1)[0];
                resolve({ success: true, message: 'Producto eliminado', product: deletedProduct });
            } catch (error) {
                reject(error);
            }
        }, 300);
    });
}

/**
 * Obtiene los productos locales (para debugging)
 * @returns {Array} Lista de productos locales
 */
function getLocalProducts() {
    return [...localProducts];
}

/**
 * Reinicia los productos a los datos de ejemplo
 */
function resetProducts() {
    localProducts = [...mockProducts];
}
