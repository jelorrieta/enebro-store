# Enebro Store - Administrador de Productos

Una aplicación web moderna para gestionar productos con una tienda en línea y un panel de administración completo.

## 📁 Estructura del Proyecto

```
enebro-store/
├── index.html                 # Página principal de la tienda
├── admin/
│   └── index.html            # Panel de administración de productos
├── js/
│   ├── app.js                # Script principal de la tienda
│   ├── modules/
│   │   ├── api.js            # Módulo de comunicación con API
│   │   └── productManager.js # Módulo de gestión de productos
│   └── admin/
│       └── admin.js          # Script del administrador
├── css/
│   ├── styles.css            # Estilos generales
│   └── admin.css             # Estilos del administrador
└── README.md                 # Este archivo
```

## 🚀 Características

### Tienda (index.html)
- Visualización de productos en grid responsivo
- Muestra nombre, descripción, precio, SKU, aromas y colores
- Imágenes de productos con placeholder
- Diseño moderno y atractivo
- Enlace directo al administrador

### Administrador (admin/index.html)
- **Crear Productos**: Formulario completo para agregar nuevos productos
- **Listar Productos**: Tabla con todos los productos
- **Editar Productos**: Modificar datos de productos existentes
- **Eliminar Productos**: Remover productos del catálogo
- **Buscar**: Búsqueda en tiempo real por nombre, descripción o SKU
- **Filtrar**: Filtrado por categoría
- **Validación**: Validación de datos requeridos

## 📦 Módulos JavaScript

### `js/modules/api.js`
Módulo de comunicación con el backend. Contiene funciones:
- `get_products()` - Obtiene lista de productos
- `get_categories()` - Obtiene lista de categorías
- `create_product(productData)` - Crea un nuevo producto
- `update_product(productId, productData)` - Actualiza un producto
- `delete_product(productId)` - Elimina un producto

### `js/modules/productManager.js`
Clase `ProductManager` que maneja la lógica de negocio:
- Carga y gestión de productos y categorías
- Filtrado por búsqueda y categoría
- Métodos CRUD para productos
- Métodos de utilidad para obtener datos

### `js/app.js`
Script principal de la tienda:
- Inicialización de la aplicación
- Renderizado de productos
- Manejo de errores

### `js/admin/admin.js`
Script del administrador:
- Inicialización del panel
- Manejo de formularios
- Gestión de eventos
- Mensajes de alerta

## 🎨 Estilos

### Variables CSS Principales
```css
--color-primary: #2c5f2d      /* Verde principal */
--color-secondary: #97bc62    /* Verde secundario */
--color-accent: #d4a574       /* Acento dorado */
--color-error: #dc3545        /* Rojo para errores */
--color-success: #28a745      /* Verde para éxito */
```

### Clases Principales
- `.btn` - Botones base
- `.btn-primary` - Botón primario
- `.btn-secondary` - Botón secundario
- `.btn-edit` - Botón de edición
- `.btn-delete` - Botón de eliminación
- `.alerta` - Alertas
- `.alerta-error` - Alerta de error
- `.alerta-exito` - Alerta de éxito

## 🔧 Uso

### Acceder a la Tienda
```
http://localhost/index.html
```

### Acceder al Administrador
```
http://localhost/admin/index.html
```

## 📝 Estructura de Datos de Producto

```javascript
{
    id: "uuid",                    // ID único
    name: "Nombre del Producto",   // Requerido
    description: "Descripción",    // Opcional
    price: 99.99,                  // Requerido
    sku: "SKU-001",               // Opcional
    imgsrc: "url/imagen.jpg",     // Opcional
    category_id: "uuid",          // Opcional
    aroma: ["Lavanda", "Eucalipto"], // Array opcional
    color: ["Blanco", "Azul"]     // Array opcional
}
```

## 🌐 API Endpoints

La aplicación se conecta a: `https://enebro-api.vercel.app`

### Endpoints Utilizados
- `GET /api/productos` - Obtener todos los productos
- `GET /api/categorias` - Obtener todas las categorías
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

## 📱 Responsividad

La aplicación es completamente responsiva con breakpoints en:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

## ✨ Características Especiales

- **Validación de Formularios**: Campos requeridos validados
- **Mensajes de Alerta**: Notificaciones de éxito y error
- **Búsqueda en Tiempo Real**: Filtrado instantáneo
- **Edición Inline**: Editar productos sin recargar
- **Confirmación de Eliminación**: Previene eliminaciones accidentales
- **Scroll Automático**: Al editar, scroll al formulario
- **Diseño Moderno**: Gradientes, sombras y transiciones

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsivo con Grid y Flexbox
- **JavaScript ES6+**: Programación moderna
- **Fetch API**: Comunicación con servidor
- **CSS Variables**: Temas y personalización

## 📄 Licencia

Este proyecto es parte de Enebro Store.

## 👨‍💻 Desarrollo

Para agregar nuevas funcionalidades:

1. **Nuevos módulos**: Crear en `js/modules/`
2. **Nuevos estilos**: Agregar a `css/`
3. **Nuevas páginas**: Crear en raíz o en carpetas específicas
4. **Documentación**: Actualizar este README

## 🐛 Solución de Problemas

### Los productos no cargan
- Verificar conexión a internet
- Verificar que la API esté disponible
- Revisar la consola del navegador para errores

### Los estilos no se aplican
- Limpiar caché del navegador (Ctrl+Shift+Delete)
- Verificar rutas de archivos CSS
- Verificar que los archivos CSS existan

### El administrador no funciona
- Verificar que todos los módulos JS estén cargados
- Revisar la consola para errores de JavaScript
- Verificar permisos de API

---

**Última actualización**: Octubre 2026
