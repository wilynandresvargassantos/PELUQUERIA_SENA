const bcrypt = require('bcrypt');
const dbService = require('../bd/Conexion'); // o la ruta de tu conexion

class CrearClienteModelo {
    static async registrarCliente(tipoD, numeroD, nom, tel, email, contras) {
        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(contras, salt);

        const query = `
            INSERT INTO clientes 
            (tipoDocumento, numeroDocumento, nombres, telefono, correo, contrasena, estado) 
            VALUES (?, ?, ?, ?, ?, ?, 'Activo')
        `;

        try {
            const resultado = await dbService.query(query, [
                tipoD,
                numeroD,
                nom,
                tel,
                email,
                contrasenaHash
            ]);
            return resultado;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = CrearClienteModelo;