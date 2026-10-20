const express = require('express');
const router = express.Router();

const loginTrabajadorCtrl = require('../../controlador/trabajadores/LoginTrabajadorControlador');
const verHorarioCtrl = require('../../controlador/trabajadores/VerHorarioControlador');
const editarHorarioCtrl = require('../../controlador/trabajadores/EditarHorarioControlador');
const eliminarHorarioCtrl = require('../../controlador/trabajadores/EliminarHorarioControlador');

// Endpoints de Trabajadores
router.post('/login-trabajador', loginTrabajadorCtrl.login); // RF-05
router.get('/mi-horario/:idTrabajador', verHorarioCtrl.verMiHorario); // RF-08
router.put('/editar-horario/:idHorario', editarHorarioCtrl.editar); // RF-09

// RF-10: Trabajador elimina horario
router.delete('/eliminar-horario/:idHorario', eliminarHorarioCtrl.eliminar);

module.exports = router;