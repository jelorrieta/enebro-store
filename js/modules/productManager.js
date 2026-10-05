/**
 * Módulo de Gestión de Productos
 * Maneja la lógica de negocio para productos
 */

class ProductManager {
    constructor() {
        this.productos = [];
        this.categorias = [];
        this.productosFiltrados = [];
    }

    /**
     * Carga todos los productos desde la API
     */
    async cargarProductos() {
        try {
            this.productos = await get_products();
            this.productosFiltrados = [...this.productos];
            return this.productos;
        } catch (error) {
            console.error('Error al cargar productos:', error);
            // Retornar array vacío en lugar de lanzar error
            this.productos = [];
            this.productosFiltrados = [];
            return [];
        }
    }

    /**
     * Carga todas las categorías desde la API
     */
    async cargarCategorias() {
        try {
            this.categorias = await get_categories();
            return this.categorias;
        } catch (error) {
            console.error('Error al cargar categorías:', error);
            // Las categorías por defecto se retornan desde api.js
            this.categorias = [];
            return [];
        }
    }

    /**
     * Crea un nuevo producto
     * @param {Object} datos - Datos del producto
     */
    async crearProducto(datos) {
        try {
            // Preparar datos para la API
            const productData = {
                p_name: datos.nombre,
                p_description: datos.descripcion || null,
                p_imgsrc: datos.imagen || null,
                p_category_id: datos.categoria || null,
                p_sku: datos.sku || null,
                p_price: datos.precio ? parseFloat(datos.precio) : null,
                p_aroma: datos.aromas ? datos.aromas.split(',').map(a => a.trim()) : null,
                p_color: datos.colores ? datos.colores.split(',').map(c => c.trim()) : null
            };

            const nuevoProducto = await create_product(productData);
            this.productos.push(nuevoProducto);
            this.productosFiltrados = [...this.productos];
            return nuevoProducto;
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    /**
     * Actualiza un producto existente
     * @param {string} productId - ID del producto
     * @param {Object} datos - Datos a actualizar
     */
    async actualizarProducto(productId, datos) {
        try {
            const productData = {
                p_name: datos.nombre,
                p_description: datos.descripcion || null,
                p_imgsrc: datos.imagen || null,
                p_category_id: datos.categoria || null,
                p_sku: datos.sku || null,
                p_price: datos.precio ? parseFloat(datos.precio) : null,
                p_aroma: datos.aromas ? datos.aromas.split(',').map(a => a.trim()) : null,
                p_color: datos.colores ? datos.colores.split(',').map(c => c.trim()) : null
            };

            const productoActualizado = await update_product(productId, productData);
            
            // Actualizar en el array local
            const index = this.productos.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.productos[index] = productoActualizado;
                this.productosFiltrados = [...this.productos];
            }
            
            return productoActualizado;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    /**
     * Elimina un producto
     * @param {string} productId - ID del producto
     */
    async eliminarProducto(productId) {
        try {
            await delete_product(productId);
            
            // Eliminar del array local
            this.productos = this.productos.filter(p => p.id !== productId);
            this.productosFiltrados = [...this.productos];
            
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }

    /**
     * Filtra productos por búsqueda de texto
     * @param {string} termino - Término de búsqueda
     */
    filtrarPorBusqueda(termino) {
        if (!termino.trim()) {
            this.productosFiltrados = [...this.productos];
            return this.productosFiltrados;
        }

        const terminoLower = termino.toLowerCase();
        this.productosFiltrados = this.productos.filter(producto => 
            producto.name.toLowerCase().includes(terminoLower) ||
            (producto.description && producto.description.toLowerCase().includes(terminoLower)) ||
            (producto.sku && producto.sku.toLowerCase().includes(terminoLower))
        );

        return this.productosFiltrados;
    }

    /**
     * Filtra productos por categoría
     * @param {string} categoriaId - ID de la categoría
     */
    filtrarPorCategoria(categoriaId) {
        if (!categoriaId) {
            this.productosFiltrados = [...this.productos];
            return this.productosFiltrados;
        }

        this.productosFiltrados = this.productos.filter(producto => 
            producto.category_id === categoriaId
        );

        return this.productosFiltrados;
    }

    /**
     * Obtiene un producto por ID
     * @param {string} productId - ID del producto
     */
    obtenerProducto(productId) {
        return this.productos.find(p => p.id === productId);
    }

    /**
     * Obtiene una categoría por ID
     * @param {string} categoriaId - ID de la categoría
     */
    obtenerCategoria(categoriaId) {
        return this.categorias.find(c => c.id === categoriaId);
    }

    /**
     * Obtiene el nombre de una categoría por ID
     * @param {string} categoriaId - ID de la categoría
     */
    obtenerNombreCategoria(categoriaId) {
        const categoria = this.obtenerCategoria(categoriaId);
        return categoria ? categoria.name : 'Sin categoría';
    }

    /**
     * Obtiene los productos filtrados actuales
     */
    obtenerProductosFiltrados() {
        return this.productosFiltrados;
    }

    /**
     * Obtiene todos los productos
     */
    obtenerTodosProductos() {
        return this.productos;
    }

    /**
     * Obtiene todas las categorías
     */
    obtenerCategorias() {
        return this.categorias;
    }
}

// Crear instancia global del gestor de productos
const productManager = new ProductManager();
