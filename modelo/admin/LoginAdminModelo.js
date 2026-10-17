const dbService = require('../bd/Conexion');
const bcrypt = require('bcrypt');

class LoginAdminModelo {
    // Ahora buscamos en la tabla trabajadores con rol SuperAdmin o Admin
    static async buscarPorCorreo(correo) {
        const query = "SELECT * FROM trabajadores WHERE correo = ? AND (rol = 'SuperAdmin' OR rol = 'Admin')";
        try {
            const filas = await dbService.query(query, [correo]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar administrador: ${err.message}`);
        }
    }

    static async verificarContrasena(contrasenaIngresada, contrasenaHash) {
        return await bcrypt.compare(contrasenaIngresada, contrasenaHash);
    }
}

module.exports = LoginAdminModelo;