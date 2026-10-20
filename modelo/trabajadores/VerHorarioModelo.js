const dbService = require('../bd/Conexion');

class VerHorarioModelo {
    // Consultar el horario asignado al trabajador autenticado
    static async obtenerHorarioPorTrabajador(idTrabajador) {
        const query = `
            SELECT 
                t.idtrabajador,
                t.nombres AS nombreTrabajador,
                t.rol,
                h.idHorario,
                h.fecha,
                h.horaInicio,
                h.horaFinal,
                rh.estado AS estadoTurno
            FROM reghorarios rh
            INNER JOIN trabajadores t ON rh.idTrabajador = t.idtrabajador
            INNER JOIN horarios h ON rh.idHorario = h.idHorario
            WHERE rh.idTrabajador = ?
              AND t.estado = 'Activo'
            ORDER BY h.fecha ASC, h.idHorario ASC
        `;
        try {
            return await dbService.query(query, [idTrabajador]);
        } catch (err) {
            throw new Error(`Error al consultar horario de trabajo: ${err.message}`);
        }
    }
}

module.exports = VerHorarioModelo;