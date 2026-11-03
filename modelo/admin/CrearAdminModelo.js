const dbService = require('../bd/Conexion');

class CrearAdminModelo {
    static async buscarPorDocumento(numeroDocumento) {
        const query = 'SELECT * FROM trabajadores WHERE numeroDocumento = ?';
        try {
            const filas = await dbService.query(query, [numeroDocumento]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar documento: ${err.message}`);
        }
    }

    static async buscarPorCorreo(correo) {
        const query = 'SELECT * FROM trabajadores WHERE correo = ?';
        try {
            const filas = await dbService.query(query, [correo]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar correo: ${err.message}`);
        }
    }

    static async registrar(tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasenaHash) {
        const query = `
            INSERT INTO trabajadores 
            (tipoDocumento, numeroDocumento, nombres, direccion, telefono, correo, contrasena, rol, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Admin', 'Activo')
        `;
        try {
            const resultado = await dbService.query(query, [
                tipoDocumento,
                numeroDocumento,
                nombres,
                direccion,
                telefono,
                correo,
                contrasenaHash
            ]);
            return resultado;
        } catch (err) {
            throw new Error(`Error al registrar administrador: ${err.message}`);
        }
    }
}

module.exports = CrearAdminModelo;