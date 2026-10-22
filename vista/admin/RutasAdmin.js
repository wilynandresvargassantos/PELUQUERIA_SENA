const express = require('express');
const router = express.Router();

const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');
const EHRutas = require('../../controlador/admin/EditarHorarioControlador');
const DelHRutas = require('../../controlador/admin/EliminarHorarioControlador');

// Endpoints de Administración con prefijo /seguridad
router.post('/seguridad/crearCliente', CRutas.crearCliente); // RF01
router.post('/seguridad/crearTrabajador', TRutas.crear);      // RF04
router.post('/seguridad/crearAdmin', ARutas.crear);
router.post('/seguridad/loginAdmin', LRutas.login);
router.put('/seguridad/editarHorario/:idHorario', EHRutas.editar); // RF11

// RF-12: Admin elimina horario
router.delete('/seguridad/eliminarHorario/:idHorario', DelHRutas.eliminar);

module.exports = router;