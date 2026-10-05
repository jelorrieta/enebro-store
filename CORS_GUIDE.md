# Guía de Solución de Problemas CORS

## ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que los navegadores implementan para controlar el acceso a recursos desde diferentes orígenes (dominios).

## Error Común

```
Access to fetch at 'https://enebro-api.vercel.app/api/categorias' 
from origin 'https://www.enebrostore.cl' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Soluciones Implementadas

### 1. **Manejo Graceful de Errores**
La aplicación ahora maneja los errores de CORS sin romper la funcionalidad:

```javascript
// En api.js
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
        console.error('Error en get_categories:', error);
        // Retorna categorías por defecto en caso de error
        return DEFAULT_CATEGORIES;
    }
}
```

### 2. **Categorías por Defecto**
Se proporcionan categorías por defecto cuando la API no está disponible:

```javascript
const DEFAULT_CATEGORIES = [
    { id: '1', name: 'Velas' },
    { id: '2', name: 'Difusores' },
    { id: '3', name: 'Aromatizantes' },
    { id: '4', name: 'Accesorios' }
];
```

### 3. **Mensajes de Advertencia**
Se muestran mensajes informativos al usuario cuando hay problemas de conexión:

```javascript
// En admin.js
if (categorias.length === 0 || productos.length === 0) {
    mostrarAdvertencia('Nota: Trabajando sin conexión a la API. Algunos datos pueden no estar disponibles.');
}
```

## Soluciones Permanentes (Para el Backend)

### Opción 1: Configurar CORS en el Backend (Recomendado)

En tu API (Node.js/Express):

```javascript
const cors = require('cors');

app.use(cors({
    origin: ['https://www.enebrostore.cl', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
```

### Opción 2: Usar un Proxy CORS

Si no puedes modificar el backend, puedes usar un servicio proxy:

```javascript
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_URL = PROXY_URL + 'https://enebro-api.vercel.app';
```

### Opción 3: Usar un Servidor Proxy Propio

Crear un endpoint en tu servidor que actúe como proxy:

```javascript
// En tu servidor
app.get('/api/proxy/categorias', async (req, res) => {
    try {
        const response = await fetch('https://enebro-api.vercel.app/api/categorias');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

## Verificación de CORS

### 1. Verificar Headers de Respuesta

Abre las DevTools (F12) → Network → Selecciona la solicitud → Headers

Busca:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
```

### 2. Verificar en la Consola

```javascript
// En la consola del navegador
fetch('https://enebro-api.vercel.app/api/categorias')
    .then(r => r.json())
    .then(d => console.log(d))
    .catch(e => console.error(e));
```

## Estado Actual de la Aplicación

✅ **Funciona sin conexión a API** - Usa datos por defecto
✅ **Muestra advertencias claras** - El usuario sabe qué está pasando
✅ **Interfaz completa** - Todos los formularios funcionan
✅ **Manejo de errores robusto** - No se rompe la aplicación

## Próximos Pasos

1. **Contactar al equipo de backend** para habilitar CORS
2. **Implementar un proxy** si es necesario
3. **Usar localStorage** para cachear datos cuando sea posible
4. **Implementar Service Workers** para funcionalidad offline

## Recursos Útiles

- [MDN - CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [CORS Anywhere](https://cors-anywhere.herokuapp.com/)
- [Enable CORS](https://enable-cors.org/)

---

**Nota**: La aplicación está diseñada para funcionar incluso sin conexión a la API, proporcionando una experiencia de usuario degradada pero funcional.
