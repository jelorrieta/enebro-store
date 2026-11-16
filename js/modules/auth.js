/**
 * Módulo de Autenticación
 * Maneja la autenticación del administrador
 */

class AuthManager {
    constructor() {
        this.apiUrl = 'https://enebro-api.vercel.app/api/auth';
        this.loginUrl = 'https://enebro-api.vercel.app/api/auth/login';
        this.verificarUrl = 'https://enebro-api.vercel.app/api/auth/verificar';
        this.tokenKey = 'admin_token';
        this.userKey = 'admin_user';
    }

    /**
     * Obtiene el token almacenado
     * @returns {string|null} Token o null si no existe
     */
    obtenerToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Obtiene el usuario almacenado
     * @returns {Object|null} Usuario o null si no existe
     */
    obtenerUsuario() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean} True si está autenticado
     */
    estaAutenticado() {
        return !!this.obtenerToken();
    }

    /**
     * Realiza login del usuario
     * @param {string} usuario - Nombre de usuario
     * @param {string} contrasena - Contraseña
     * @returns {Promise<Object>} Resultado del login
     */
    async login(usuario, contrasena) {
        try {
            const response = await fetch(this.loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, contrasena })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.mensaje || 'Error al iniciar sesión');
            }

            const data = await response.json();

            // Guardar token y usuario
            localStorage.setItem(this.tokenKey, data.token);
            localStorage.setItem(this.userKey, JSON.stringify(data.usuario));

            return {
                exito: true,
                mensaje: 'Sesión iniciada correctamente',
                usuario: data.usuario
            };
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    /**
     * Realiza logout del usuario
     */
    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    /**
     * Verifica si el token es válido
     * @returns {Promise<boolean>} True si el token es válido
     */
    async verificarToken() {
        try {
            const token = this.obtenerToken();
            if (!token) return false;

            const response = await fetch(this.verificarUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Error al verificar token:', error);
            return false;
        }
    }
}

// Crear instancia global del gestor de autenticación
const authManager = new AuthManager();
