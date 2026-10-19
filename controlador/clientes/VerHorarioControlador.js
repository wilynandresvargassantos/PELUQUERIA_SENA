const modelo = require('../../modelo/clientes/VerHorarioModelo');

class VerHorarioControlador {
    static async verHorarios(req, res) {
        const { idTrabajador } = req.query; // Permite filtrar opcionalmente por query (?idTrabajador=1)

        try {
            let horarios;
            if (idTrabajador) {
                if (isNaN(idTrabajador)) {
                    return res.status(400).json({ error: 'El ID del trabajador debe ser numérico.' });
                }
                horarios = await modelo.obtenerHorariosPorTrabajador(idTrabajador);
            } else {
                horarios = await modelo.obtenerHorariosDisponibles();
            }

            if (!horarios || horarios.length === 0) {
                return res.status(200).json({ 
                    mensaje: 'No hay horarios disponibles en este momento.', 
                    datos: [] 
                });
            }

            res.status(200).json({
                mensaje: 'Horarios disponibles consultados con éxito.',
                total: horarios.length,
                datos: horarios
            });
        } catch (err) {
            return res.status(500).json({ error: 'Error del servidor: ' + err.message });
        }
    }
}

module.exports = VerHorarioControlador;