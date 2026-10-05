# Guía de Configuración del Backend

## Error Actual

```
NeonDbError: function get_productos() does not exist
```

Este error indica que el backend está intentando llamar a una función SQL que no existe en la base de datos.

## Solución

### Paso 1: Verificar Nombres de Funciones

El backend está usando `get_productos()` pero probablemente debería ser `get_products()` o viceversa.

Verifica en tu base de datos Neon qué funciones existen:

```sql
-- Conecta a tu base de datos Neon y ejecuta:
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_type = 'FUNCTION' 
AND routine_schema = 'public';
```

### Paso 2: Crear las Funciones Necesarias

Si las funciones no existen, crea las siguientes en tu base de datos Neon:

#### Función para obtener productos

```sql
CREATE OR REPLACE FUNCTION get_products()
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    price NUMERIC(12,2),
    sku TEXT,
    imgsrc TEXT,
    category_id UUID,
    aroma TEXT[],
    color TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.sku,
        p.imgsrc,
        p.category_id,
        p.aroma,
        p.color
    FROM products p
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;
```

#### Función para obtener categorías

```sql
CREATE OR REPLACE FUNCTION get_categories()
RETURNS TABLE (
    id UUID,
    name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name
    FROM categories c
    ORDER BY c.name;
END;
$$ LANGUAGE plpgsql;
```

#### Función para crear producto

```sql
CREATE OR REPLACE FUNCTION create_product(
    p_name TEXT,
    p_description TEXT DEFAULT NULL,
    p_imgsrc TEXT DEFAULT NULL,
    p_category_id UUID DEFAULT NULL,
    p_sku NUMERIC DEFAULT NULL,
    p_price NUMERIC(12,2) DEFAULT NULL,
    p_aroma TEXT[] DEFAULT NULL,
    p_color TEXT[] DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    price NUMERIC(12,2),
    sku TEXT,
    imgsrc TEXT,
    category_id UUID,
    aroma TEXT[],
    color TEXT[]
) AS $$
DECLARE
    v_id UUID;
BEGIN
    v_id := gen_random_uuid();
    
    INSERT INTO products (
        id, name, description, imgsrc, category_id, sku, price, aroma, color, created_at
    ) VALUES (
        v_id, p_name, p_description, p_imgsrc, p_category_id, p_sku::TEXT, p_price, p_aroma, p_color, NOW()
    );
    
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.sku,
        p.imgsrc,
        p.category_id,
        p.aroma,
        p.color
    FROM products p
    WHERE p.id = v_id;
END;
$$ LANGUAGE plpgsql;
```

### Paso 3: Verificar Estructura de Tablas

Asegúrate de que existan las tablas necesarias:

```sql
-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12,2),
    sku TEXT,
    imgsrc TEXT,
    category_id UUID REFERENCES categories(id),
    aroma TEXT[],
    color TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
```

### Paso 4: Actualizar el Backend

Si el backend está usando nombres diferentes, actualiza los endpoints para que coincidan con los nombres de las funciones.

**Opción A**: Si el backend usa `get_productos()`, renombra las funciones:

```sql
ALTER FUNCTION get_products() RENAME TO get_productos;
ALTER FUNCTION get_categories() RENAME TO get_categorias;
ALTER FUNCTION create_product(...) RENAME TO create_producto;
```

**Opción B**: Si el backend debería usar `get_products()`, actualiza el código del backend para usar los nombres correctos.

### Paso 5: Habilitar CORS en el Backend

Asegúrate de que el backend tenga CORS habilitado:

```javascript
// En tu archivo de API (Node.js/Express)
const cors = require('cors');

app.use(cors({
    origin: ['https://www.enebrostore.cl', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
}));
```

## Verificación

Una vez completados los pasos anteriores, prueba los endpoints:

```bash
# Obtener productos
curl https://enebro-api.vercel.app/api/productos

# Obtener categorías
curl https://enebro-api.vercel.app/api/categorias

# Crear producto
curl -X POST https://enebro-api.vercel.app/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "p_name": "Producto Test",
    "p_price": 99.99,
    "p_description": "Descripción test"
  }'
```

## Checklist de Configuración

- [ ] Verificar que las funciones SQL existen en la base de datos
- [ ] Crear las funciones si no existen
- [ ] Verificar que las tablas existen
- [ ] Actualizar nombres de funciones si es necesario
- [ ] Habilitar CORS en el backend
- [ ] Probar endpoints con curl o Postman
- [ ] Verificar que la aplicación frontend funciona

## Recursos

- [Neon Database Docs](https://neon.tech/docs)
- [PostgreSQL Functions](https://www.postgresql.org/docs/current/sql-createfunction.html)
- [Express CORS](https://expressjs.com/en/resources/middleware/cors.html)

---

**Nota**: Una vez que el backend esté correctamente configurado, la aplicación frontend funcionará sin problemas.
