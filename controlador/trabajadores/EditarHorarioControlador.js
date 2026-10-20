const modelo = require('../../modelo/trabajadores/EditarHorarioModelo');

class EditarHorarioControlador {
    static async editar(req, res) {
        const { idHorario } = req.params;
        const { t1: fecha, t2: horaInicio, t3: horaFinal, t4: estado } = req.body;

        // Validaciones
        if (!idHorario || isNaN(idHorario)) {
            return res.status(400).json({ error: 'El ID del horario es obligatorio y debe ser numérico.' });
        }

        if (!fecha || !horaInicio || !horaFinal || !estado) {
            return res.status(400).json({ error: 'Todos los campos (fecha, hora inicio, hora final, estado) son obligatorios.' });
        }

        if (estado !== 'Activo' && estado !== 'Inactivo') {
            return res.status(400).json({ error: "El estado debe ser 'Activo' o 'Inactivo'." });
        }

        try {
            // Verificar existencia previa (RN03)
            const horarioExistente = await modelo.buscarHorarioPorId(idHorario);
            if (!horarioExistente) {
                return res.status(404).json({ error: 'El horario no existe en el sistema.' });
            }

            // Actualizar datos
            await modelo.actualizarHorario(idHorario, fecha, horaInicio, horaFinal, estado);

            res.status(200).json({
                mensaje: 'Horario actualizado correctamente.',
                datos: {
                    idHorario: Number(idHorario),
                    fecha,
                    horaInicio,
                    horaFinal,
                    estado
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = EditarHorarioControlador;