const dbService = require('../bd/Conexion');

class GestionCitaModelo {
    // Buscar el registro de horario (cita) por su idRegHorario
    static async buscarPorId(idRegHorario) {
        const query = 'SELECT * FROM reghorarios WHERE idRegHorario = ?';
        try {
            const filas = await dbService.query(query, [idRegHorario]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar la cita: ${err.message}`);
        }
    }

    // Buscar si el nuevo horario existe y está activo
    static async buscarHorarioPorId(idHorario) {
        const query = 'SELECT * FROM horarios WHERE idHorario = ?';
        try {
            const filas = await dbService.query(query, [idHorario]);
            return filas[0] || null;
        } catch (err) {
            throw new Error(`Error al buscar horario: ${err.message}`);
        }
    }

    // Cancelar la cita (estado = 'Cancelada') y liberar el horario (estado = 'Activo')
    static async cancelarCita(idRegHorario, idHorario) {
        const queryReg = "UPDATE reghorarios SET estado = 'Cancelada' WHERE idRegHorario = ?";
        const queryHorario = "UPDATE horarios SET estado = 'Activo' WHERE idHorario = ?";

        try {
            await dbService.query(queryReg, [idRegHorario]);
            if (idHorario) {
                await dbService.query(queryHorario, [idHorario]);
            }
            return true;
        } catch (err) {
            throw new Error(`Error al cancelar cita: ${err.message}`);
        }
    }

    // Reprogramar cita: liberar horario anterior, ocupar el nuevo y actualizar reghorarios
    static async reprogramarCita(idRegHorario, idHorarioAnterior, nuevoIdHorario) {
        const queryLiberar = "UPDATE horarios SET estado = 'Activo' WHERE idHorario = ?";
        const queryOcupar = "UPDATE horarios SET estado = 'Inactivo' WHERE idHorario = ?";
        const queryActualizar = "UPDATE reghorarios SET idHorario = ?, estado = 'Activo' WHERE idRegHorario = ?";

        try {
            if (idHorarioAnterior) {
                await dbService.query(queryLiberar, [idHorarioAnterior]);
            }
            await dbService.query(queryOcupar, [nuevoIdHorario]);
            await dbService.query(queryActualizar, [nuevoIdHorario, idRegHorario]);
            return true;
        } catch (err) {
            throw new Error(`Error al reprogramar cita: ${err.message}`);
        }
    }
}

module.exports = GestionCitaModelo;