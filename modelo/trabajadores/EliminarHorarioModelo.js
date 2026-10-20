const dbService = require('../bd/Conexion');

class EliminarHorarioModelo {
    // Buscar horario por ID para validar existencia (RN-06)
    static async buscarPorId(idHorario) {
        const query = 'SELECT * FROM horarios WHERE idHorario = ?';
        try {
            const filas = await dbService.query(query, [idHorario]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar horario: ${err.message}`);
        }
    }

    // Eliminar el horario manteniendo la integridad referencial (RN-04)
    static async eliminarHorario(idHorario) {
        // 1. Eliminar referencias en la tabla intermedia reghorarios
        const queryReg = 'DELETE FROM reghorarios WHERE idHorario = ?';
        // 2. Eliminar de la tabla horarios
        const queryHorario = 'DELETE FROM horarios WHERE idHorario = ?';

        try {
            await dbService.query(queryReg, [idHorario]);
            return await dbService.query(queryHorario, [idHorario]);
        } catch (err) {
            throw new Error(`Error al eliminar horario en la base de datos: ${err.message}`);
        }
    }
}

module.exports = EliminarHorarioModelo;