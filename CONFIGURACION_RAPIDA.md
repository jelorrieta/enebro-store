# ⚡ Configuración Rápida - ImageKit Upload

## 🎯 Lo que necesitas hacer AHORA

### Paso 1: Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel y agrega estas variables de entorno:

```
IMAGEKIT_PUBLIC_KEY = public_xZ311RwM6rSu1/3yRkykSzXnjsY=
IMAGEKIT_PRIVATE_KEY = [Tu Private Key - Cópialo de ImageKit]
```

**Dónde encontrar el Private Key:**
1. Ve a https://imagekit.io/dashboard/settings/api-keys
2. Busca "private_WPTt..." (está parcialmente oculto)
3. Haz clic en el ícono de ojo para verlo completo
4. Cópialo y pégalo en Vercel

### Paso 2: Verificar Configuración en el Frontend

✅ **YA ESTÁ HECHO** - El archivo `js/modules/imageKit.js` ya tiene:
- Public Key correcto: `public_xZ311RwM6rSu1/3yRkykSzXnjsY=`
- URL Endpoint correcto: `https://ik.imagekit.io/4uoe6xnkb`
- Endpoint de API: `https://enebro-api.vercel.app/api/imagekit-auth`

### Paso 3: Probar el Upload

1. Ve a `https://tu-dominio.com/admin/index.html`
2. En "Crear Nuevo Producto":
   - Completa nombre y precio
   - Selecciona una imagen en "Subir Imagen a ImageKit"
   - Haz clic en "Subir Imagen"
   - Espera a que se complete
   - La URL se llenará automáticamente
   - Haz clic en "Crear Producto"

## 📋 Checklist de Configuración

- [ ] Copiar Private Key de ImageKit
- [ ] Agregar `IMAGEKIT_PUBLIC_KEY` a Vercel
- [ ] Agregar `IMAGEKIT_PRIVATE_KEY` a Vercel
- [ ] Esperar a que Vercel redeploy (automático)
- [ ] Probar upload en administrador
- [ ] Verificar que imagen aparece en tienda

## 🔑 Tus Credenciales

```
ImageKit ID: 4uoe6xnkb
Public Key: public_xZ311RwM6rSu1/3yRkykSzXnjsY=
URL Endpoint: https://ik.imagekit.io/4uoe6xnkb
```

**⚠️ IMPORTANTE:** El Private Key NO debe compartirse. Mantenlo seguro en Vercel.

## 🚀 Después de Configurar

Una vez que hayas configurado las variables de entorno:

1. **Redeploy automático** - Vercel redeploy automáticamente
2. **Prueba el upload** - Ve al administrador y sube una imagen
3. **Verifica en tienda** - La imagen debe aparecer en el catálogo

## 🐛 Si algo no funciona

1. **Revisa la consola** - Abre F12 en el navegador
2. **Verifica variables** - Asegúrate que estén en Vercel
3. **Revisa logs** - Ve a Vercel → Deployments → Logs
4. **Consulta documentación** - Lee `IMAGEKIT_SETUP.md`

## 📞 Soporte Rápido

| Problema | Solución |
|----------|----------|
| "Credenciales no configuradas" | Agrega variables a Vercel |
| "Error al obtener token" | Verifica que Vercel haya redeploy |
| "Imagen no se sube" | Revisa consola (F12) para errores |
| "URL no se llena" | Espera a que upload complete |

## ✅ Listo

Una vez completados estos pasos, el sistema de upload estará completamente funcional.

**Tiempo estimado:** 5-10 minutos

---

Para más detalles, consulta `IMAGEKIT_SETUP.md` o `CAMBIOS_IMAGEKIT.md`
