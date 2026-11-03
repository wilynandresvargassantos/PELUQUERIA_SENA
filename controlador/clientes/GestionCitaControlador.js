const modelo = require('../../modelo/clientes/GestionCitaModelo');

class GestionCitaControlador {
    // CA-01: Cancelar cita
    static async cancelar(req, res) {
        const { idCita } = req.params;

        if (!idCita || isNaN(idCita)) {
            return res.status(400).json({ error: 'El ID de la cita (idRegHorario) es obligatorio y numérico.' });
        }

        try {
            const registro = await modelo.buscarPorId(idCita);
            if (!registro) {
                return res.status(404).json({ error: 'La cita seleccionada no existe.' });
            }

            if (registro.estado === 'Cancelada') {
                return res.status(400).json({ error: 'La cita ya se encuentra en estado Cancelada.' });
            }

            await modelo.cancelarCita(idCita, registro.idHorario);

            res.status(200).json({
                mensaje: 'La cita ha sido cancelada exitosamente.',
                idRegHorario: Number(idCita),
                estado: 'Cancelada',
                horarioLiberado: registro.idHorario
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }

    // CA-02: Reprogramar cita
    static async reprogramar(req, res) {
        const { idCita } = req.params;
        const { nuevoIdHorario } = req.body;

        if (!idCita || isNaN(idCita)) {
            return res.status(400).json({ error: 'El ID de la cita (idRegHorario) es obligatorio y numérico.' });
        }

        if (!nuevoIdHorario || isNaN(nuevoIdHorario)) {
            return res.status(400).json({ error: 'nuevoIdHorario es obligatorio y debe ser numérico.' });
        }

        try {
            const registro = await modelo.buscarPorId(idCita);
            if (!registro) {
                return res.status(404).json({ error: 'La cita a reprogramar no existe.' });
            }

            if (registro.estado === 'Cancelada') {
                return res.status(400).json({ error: 'No se puede reprogramar una cita cancelada.' });
            }

            // CA-04: Validar disponibilidad del nuevo horario
            const nuevoHorario = await modelo.buscarHorarioPorId(nuevoIdHorario);
            if (!nuevoHorario) {
                return res.status(404).json({ error: 'El nuevo horario seleccionado no existe.' });
            }

            if (nuevoHorario.estado !== 'Activo') {
                return res.status(400).json({ error: 'El nuevo horario seleccionado ya no se encuentra disponible.' });
            }

            await modelo.reprogramarCita(idCita, registro.idHorario, nuevoIdHorario);

            res.status(200).json({
                mensaje: 'La cita ha sido reprogramada exitosamente.',
                citaActualizada: {
                    idRegHorario: Number(idCita),
                    nuevoIdHorario: Number(nuevoIdHorario),
                    estado: 'Activo'
                }
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = GestionCitaControlador;