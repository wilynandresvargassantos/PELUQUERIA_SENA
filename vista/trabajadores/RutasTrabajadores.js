const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verHorarioCtrl = require('../../controlador/trabajadores/VerHorarioControlador');
const editarHorarioCtrl = require('../../controlador/trabajadores/EditarHorarioControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05
router.get('/mi-horario/:idTrabajador', verHorarioCtrl.verMiHorario); // RF-08

// RF-09: Trabajador edita horario
router.put('/editar-horario/:idHorario', editarHorarioCtrl.editar);

module.exports = router;