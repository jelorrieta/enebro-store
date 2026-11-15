/**
 * Módulo de ImageKit para upload de imágenes
 * Maneja la carga de imágenes a ImageKit
 */

class ImageKitUploader {
    constructor() {
        // Configuración de ImageKit
        this.publicKey = '4uoe6xnkb';
        this.urlEndpoint = 'https://ik.imagekit.io/4uoe6xnkb/enebro';
        this.authenticationEndpoint = 'https://enebro-api.vercel.app/api/imagekit-auth';
    }

    /**
     * Obtiene el token de autenticación de ImageKit
     * @returns {Promise<Object>} Token y parámetros de autenticación
     */
    async obtenerTokenAutenticacion() {
        try {
            const response = await fetch(this.authenticationEndpoint);
            
            if (!response.ok) {
                throw new Error(`Error al obtener token: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener token de autenticación:', error);
            throw error;
        }
    }

    /**
     * Sube una imagen a ImageKit
     * @param {File} archivo - Archivo de imagen a subir
     * @param {string} nombreArchivo - Nombre del archivo (opcional)
     * @returns {Promise<Object>} Respuesta de ImageKit con URL de la imagen
     */
    async subirImagen(archivo, nombreArchivo = null) {
        try {
            // Validar que sea una imagen
            if (!archivo.type.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            }

            // Validar tamaño (máximo 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (archivo.size > maxSize) {
                throw new Error('El archivo es demasiado grande (máximo 5MB)');
            }

            // Obtener token de autenticación
            const auth = await this.obtenerTokenAutenticacion();

            // Preparar FormData
            const formData = new FormData();
            formData.append('file', archivo);
            formData.append('publicKey', this.publicKey);
            formData.append('signature', auth.signature);
            formData.append('expire', auth.expire);
            formData.append('token', auth.token);
            
            // Usar nombre personalizado si se proporciona
            if (nombreArchivo) {
                formData.append('fileName', nombreArchivo);
            }

            // Subir a ImageKit
            const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error al subir imagen: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Retornar la URL de la imagen subida
            return {
                success: true,
                url: data.url,
                fileId: data.fileId,
                fileName: data.name,
                filePath: data.filePath
            };
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw error;
        }
    }

    /**
     * Sube múltiples imágenes
     * @param {FileList} archivos - Lista de archivos a subir
     * @returns {Promise<Array>} Array de resultados de upload
     */
    async subirMultiplesImagenes(archivos) {
        try {
            const promesas = Array.from(archivos).map(archivo => 
                this.subirImagen(archivo)
            );
            
            return await Promise.all(promesas);
        } catch (error) {
            console.error('Error al subir múltiples imágenes:', error);
            throw error;
        }
    }

    /**
     * Genera una URL de preview de la imagen
     * @param {string} url - URL de la imagen en ImageKit
     * @param {number} ancho - Ancho del preview (opcional)
     * @param {number} alto - Alto del preview (opcional)
     * @returns {string} URL con parámetros de transformación
     */
    generarUrlPreview(url, ancho = 250, alto = 250) {
        if (!url) return null;
        
        // Si ya tiene parámetros de transformación, retornar como está
        if (url.includes('?')) {
            return url;
        }
        
        // Agregar parámetros de transformación
        return `${url}?tr=w-${ancho},h-${alto},c-at`;
    }
}

// Crear instancia global del uploader de ImageKit
const imageKitUploader = new ImageKitUploader();
