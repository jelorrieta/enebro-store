# Configuración de Upload de Imágenes con ImageKit

Este documento describe cómo configurar y usar el sistema de upload de imágenes a ImageKit en la tienda Enebro.

## 📋 Requisitos Previos

- Cuenta en [ImageKit.io](https://imagekit.io)
- Acceso a las credenciales de ImageKit (Public Key y Private Key)
- Acceso a las variables de entorno de la API (Vercel o servidor)

## 🔧 Configuración

### 1. Obtener Credenciales de ImageKit

1. Inicia sesión en [ImageKit.io](https://imagekit.io)
2. Ve a **Settings** → **API Keys**
3. Copia tu **Public Key** y **Private Key**
4. Anota tu **URL Endpoint** (ej: `https://ik.imagekit.io/4uoe6xnkb/enebro`)

### 2. Configurar Variables de Entorno en la API

En tu servidor (Vercel o local), configura las siguientes variables de entorno:

```
IMAGEKIT_PUBLIC_KEY=tu_public_key_aqui
IMAGEKIT_PRIVATE_KEY=tu_private_key_aqui
```

**Para Vercel:**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las dos variables anteriores

**Para desarrollo local:**
Crea un archivo `.env.local` en la raíz del proyecto `enebro-api`:

```
IMAGEKIT_PUBLIC_KEY=tu_public_key_aqui
IMAGEKIT_PRIVATE_KEY=tu_private_key_aqui
DATABASE_URL=tu_database_url_aqui
```

### 3. Actualizar la Configuración en el Frontend

En `js/modules/imageKit.js`, la configuración ya está actualizada con tus credenciales:

```javascript
this.publicKey = 'public_xZ311RwM6rSu1/3yRkykSzXnjsY='; // Tu Public Key
this.urlEndpoint = 'https://ik.imagekit.io/4uoe6xnkb'; // Tu URL Endpoint
this.authenticationEndpoint = 'https://enebro-api.vercel.app/api/imagekit-auth'; // Tu API
```

**Nota:** El Public Key ya está configurado. Solo necesitas configurar las variables de entorno en la API.

## 🚀 Uso

### En el Administrador de Productos

1. Ve a la sección **"Crear Nuevo Producto"**
2. Completa los campos del formulario
3. En la sección **"Subir Imagen a ImageKit"**:
   - Haz clic en el input de archivo para seleccionar una imagen
   - Verás un preview local de la imagen
   - Haz clic en el botón **"Subir Imagen"**
   - Espera a que se complete la carga
   - La URL de la imagen se llenará automáticamente en el campo "URL de Imagen"
4. Completa el resto del formulario y haz clic en **"Crear Producto"**

### Características del Upload

- ✅ **Preview local**: Ve la imagen antes de subirla
- ✅ **Validación**: Solo acepta archivos de imagen
- ✅ **Límite de tamaño**: Máximo 5MB por imagen
- ✅ **Feedback visual**: Indicador de estado (cargando, éxito, error)
- ✅ **Integración automática**: La URL se inserta automáticamente en el formulario

## 📁 Estructura de Archivos

### Frontend (enebro-store)

```
js/modules/imageKit.js          # Módulo de upload a ImageKit
js/admin/admin.js               # Lógica del administrador (incluye manejo de upload)
admin/index.html                # Formulario con input de archivo
css/admin.css                   # Estilos del upload
```

### Backend (enebro-api)

```
api/imagekit-auth.js            # Endpoint para generar tokens de autenticación
```

## 🔐 Seguridad

- Los tokens de autenticación se generan en el servidor (backend)
- Los tokens tienen una validez de 30 minutos
- Las credenciales privadas nunca se exponen al cliente
- Se valida el origen de las solicitudes (CORS)

## 🐛 Solución de Problemas

### Error: "Las credenciales de ImageKit no están configuradas"

**Solución**: Verifica que las variables de entorno `IMAGEKIT_PUBLIC_KEY` y `IMAGEKIT_PRIVATE_KEY` estén configuradas correctamente en tu servidor.

### Error: "Error al obtener token de autenticación"

**Solución**: 
- Verifica que el endpoint de la API sea accesible
- Comprueba que las variables de entorno estén configuradas
- Revisa la consola del navegador para más detalles

### La imagen no se sube

**Solución**:
- Verifica que el archivo sea una imagen válida (JPG, PNG, GIF, etc.)
- Comprueba que el tamaño sea menor a 5MB
- Revisa la consola del navegador para mensajes de error

### La URL de la imagen no se llena automáticamente

**Solución**:
- Espera a que el upload se complete (verifica el indicador de estado)
- Revisa que no haya errores en la consola del navegador
- Intenta subir la imagen nuevamente

## 📚 Referencias

- [Documentación de ImageKit](https://docs.imagekit.io/)
- [API de Upload de ImageKit](https://docs.imagekit.io/api-reference/upload-file-api)
- [Autenticación de ImageKit](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload)

## 💡 Consejos

1. **Optimización de imágenes**: ImageKit optimiza automáticamente las imágenes subidas
2. **Transformaciones**: Puedes usar parámetros de transformación en las URLs (ej: `?tr=w-250,h-250,c-at`)
3. **Caché**: Las imágenes se cachean automáticamente en CDN global
4. **Monitoreo**: Usa el dashboard de ImageKit para monitorear el uso y estadísticas

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs de la API
3. Verifica las variables de entorno
4. Consulta la documentación de ImageKit
