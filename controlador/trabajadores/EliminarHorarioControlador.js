const modelo = require('../../modelo/trabajadores/EliminarHorarioModelo');

class EliminarHorarioControlador {
    static async eliminar(req, res) {
        const { idHorario } = req.params;

        if (!idHorario || isNaN(idHorario)) {
            return res.status(400).json({ error: 'El ID del horario es obligatorio y debe ser numérico.' });
        }

        try {
            // Validar existencia previa (RN-06 / CA-08)
            const horario = await modelo.buscarPorId(idHorario);
            if (!horario) {
                return res.status(404).json({ error: 'El horario seleccionado no existe o ya fue eliminado.' });
            }

            // Ejecutar eliminación
            await modelo.eliminarHorario(idHorario);

            // Mensaje requerido por el criterio de aceptación CA-13
            res.status(200).json({
                mensaje: 'El horario ha sido eliminado correctamente.',
                idHorarioEliminado: Number(idHorario)
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor al eliminar el horario: ' + err.message });
        }
    }
}

module.exports = EliminarHorarioControlador;