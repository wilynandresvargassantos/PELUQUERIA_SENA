const bcrypt = require('bcrypt');
const modelo = require('../../modelo/admin/CrearAdminModelo');

class CrearAdminControlador {
    static async crear(req, res) {
        const { 
            t1: tipoDocumento, 
            t2: numeroDocumento, 
            t3: nombres, 
            t4: direccion, 
            t5: telefono, 
            t6: correo, 
            t7: contrasena 
        } = req.body;

        // Validar campos obligatorios
        if (!tipoDocumento || !numeroDocumento || !nombres || !direccion || !telefono || !correo || !contrasena) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Validar formato numérico del documento (7 a 10 dígitos)
        if (!/^\d{7,10}$/.test(numeroDocumento)) {
            return res.status(400).json({ error: 'El número de documento debe contener entre 7 y 10 dígitos numéricos.' });
        }

        // Validar teléfono (10 dígitos)
        if (!/^\d{10}$/.test(telefono)) {
            return res.status(400).json({ error: 'El teléfono debe contener exactamente 10 dígitos.' });
        }

        // Validar correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido.' });
        }

        try {
            // Validar documento duplicado en trabajadores
            const existeDoc = await modelo.buscarPorDocumento(numeroDocumento);
            if (existeDoc) {
                return res.status(409).json({ error: 'Ya existe un usuario registrado con ese número de documento.' });
            }

            // Validar correo duplicado en trabajadores
            const existeEmail = await modelo.buscarPorCorreo(correo);
            if (existeEmail) {
                return res.status(409).json({ error: 'Ya existe un usuario registrado con ese correo electrónico.' });
            }

            // Hashear contraseña con bcrypt
            const salt = await bcrypt.genSalt(10);
            const contrasenaHash = await bcrypt.hash(contrasena, salt);

            // Guardar en la tabla trabajadores con rol Admin
            const resultado = await modelo.registrar(
                tipoDocumento,
                numeroDocumento,
                nombres,
                direccion,
                telefono,
                correo,
                contrasenaHash
            );

            res.status(201).json({
                mensaje: 'Administrador creado exitosamente en el sistema.',
                idTrabajador: resultado.insertId,
                nombres,
                correo,
                rol: 'Admin',
                estado: 'Activo'
            });

        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor al registrar: ' + err.message });
        }
    }
}

module.exports = CrearAdminControlador;