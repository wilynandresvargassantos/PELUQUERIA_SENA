const modelo = require('../../modelo/trabajadores/VerHorarioModelo');

class VerHorarioControlador {
    static async verMiHorario(req, res) {
        const { idTrabajador } = req.params;

        // Validar que el parámetro esté presente y sea numérico
        if (!idTrabajador || isNaN(idTrabajador)) {
            return res.status(400).json({ error: 'El ID del trabajador es obligatorio y debe ser numérico.' });
        }

        try {
            const horarios = await modelo.obtenerHorarioPorTrabajador(idTrabajador);

            // CA-03: Horario no asignado
            if (!horarios || horarios.length === 0) {
                return res.status(200).json({
                    mensaje: 'No tiene un horario asignado actualmente.',
                    datos: []
                });
            }

            res.status(200).json({
                mensaje: 'Horario laboral consultado con éxito.',
                totalTurnos: horarios.length,
                trabajador: horarios[0].nombreTrabajador,
                horarios: horarios
            });
        } catch (err) {
            return res.status(500).json({ error: 'No se pudo cargar el horario, intente nuevamente: ' + err.message });
        }
    }
}

module.exports = VerHorarioControlador;