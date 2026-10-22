const modelo = require('../../modelo/admin/EliminarHorarioModelo');

class EliminarHorarioControlador {
    static async eliminar(req, res) {
        const { idHorario } = req.params;

        if (!idHorario || isNaN(idHorario)) {
            return res.status(400).json({ error: 'El ID del horario es obligatorio y debe ser numérico.' });
        }

        try {
            // Validar existencia previa (RN-03 / CA-06)
            const horario = await modelo.buscarPorId(idHorario);
            if (!horario) {
                return res.status(404).json({ error: 'El horario no existe o ya fue eliminado del sistema.' });
            }

            await modelo.eliminarHorario(idHorario);

            res.status(200).json({
                mensaje: 'Horario eliminado correctamente por el administrador.',
                idHorarioEliminado: Number(idHorario)
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor al eliminar el horario: ' + err.message });
        }
    }
}

module.exports = EliminarHorarioControlador;