const dbService = require('../bd/Conexion');

class VerHorarioModelo {
    // Listar todos los horarios disponibles de trabajadores activos
    static async obtenerHorariosDisponibles() {
        const query = `
            SELECT 
                t.idtrabajador,
                t.nombres AS nombreTrabajador,
                t.rol,
                h.idHorario,
                h.fecha,
                h.horaInicio,
                h.horaFinal,
                rh.estado AS estadoHorario
            FROM reghorarios rh
            INNER JOIN trabajadores t ON rh.idTrabajador = t.idtrabajador
            INNER JOIN horarios h ON rh.idHorario = h.idHorario
            WHERE t.estado = 'Activo' 
              AND h.estado = 'Activo' 
              AND rh.estado = 'Activo'
            ORDER BY h.fecha ASC, h.idHorario ASC
        `;
        try {
            return await dbService.query(query);
        } catch (err) {
            throw new Error(`Error al consultar horarios: ${err.message}`);
        }
    }

    // Consultar horarios disponibles de un trabajador específico por su ID
    static async obtenerHorariosPorTrabajador(idTrabajador) {
        const query = `
            SELECT 
                t.idtrabajador,
                t.nombres AS nombreTrabajador,
                t.rol,
                h.idHorario,
                h.fecha,
                h.horaInicio,
                h.horaFinal,
                rh.estado AS estadoHorario
            FROM reghorarios rh
            INNER JOIN trabajadores t ON rh.idTrabajador = t.idtrabajador
            INNER JOIN horarios h ON rh.idHorario = h.idHorario
            WHERE rh.idTrabajador = ?
              AND t.estado = 'Activo' 
              AND h.estado = 'Activo' 
              AND rh.estado = 'Activo'
            ORDER BY h.fecha ASC, h.idHorario ASC
        `;
        try {
            return await dbService.query(query, [idTrabajador]);
        } catch (err) {
            throw new Error(`Error al consultar horarios del trabajador: ${err.message}`);
        }
    }
}

module.exports = VerHorarioModelo;