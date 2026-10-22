const dbService = require('../bd/Conexion');

class EliminarHorarioModelo {
    // Buscar si el horario existe antes de intentar eliminarlo (RN-03)
    static async buscarPorId(idHorario) {
        const query = 'SELECT * FROM horarios WHERE idHorario = ?';
        try {
            const filas = await dbService.query(query, [idHorario]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar horario: ${err.message}`);
        }
    }

    // Eliminación del horario preservando integridad referencial
    static async eliminarHorario(idHorario) {
        const queryReg = 'DELETE FROM reghorarios WHERE idHorario = ?';
        const queryHorario = 'DELETE FROM horarios WHERE idHorario = ?';

        try {
            await dbService.query(queryReg, [idHorario]);
            return await dbService.query(queryHorario, [idHorario]);
        } catch (err) {
            throw new Error(`Error al eliminar horario: ${err.message}`);
        }
    }
}

module.exports = EliminarHorarioModelo;