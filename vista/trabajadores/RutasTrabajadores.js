const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verHorarioCtrl = require('../../controlador/trabajadores/VerHorarioControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05

// RF-08: Trabajador visualiza su horario laboral
router.get('/mi-horario/:idTrabajador', verHorarioCtrl.verMiHorario);

module.exports = router;