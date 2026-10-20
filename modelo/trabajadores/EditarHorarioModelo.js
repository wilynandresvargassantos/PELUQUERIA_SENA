const dbService = require('../bd/Conexion');

class EditarHorarioModelo {
    // Buscar horario por id para comprobar existencia
    static async buscarHorarioPorId(idHorario) {
        const query = 'SELECT * FROM horarios WHERE idHorario = ?';
        try {
            const filas = await dbService.query(query, [idHorario]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar horario: ${err.message}`);
        }
    }

    // Actualizar los datos del horario
    static async actualizarHorario(idHorario, fecha, horaInicio, horaFinal, estado) {
        const query = `
            UPDATE horarios 
            SET fecha = ?, horaInicio = ?, horaFinal = ?, estado = ?
            WHERE idHorario = ?
        `;
        try {
            return await dbService.query(query, [fecha, horaInicio, horaFinal, estado, idHorario]);
        } catch (err) {
            throw new Error(`Error al actualizar horario: ${err.message}`);
        }
    }
}

module.exports = EditarHorarioModelo;