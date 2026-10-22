const express = require('express');
const router = express.Router();

const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');
const EHRutas = require('../../controlador/admin/EditarHorarioControlador');
const DelHRutas = require('../../controlador/admin/EliminarHorarioControlador');
const MTRutas = require('../../controlador/admin/DesactivarTrabajadorControlador');
const ATRutas = require('../../controlador/admin/ActivarTrabajadorControlador');

// Endpoints de Administración con prefijo /seguridad
router.post('/seguridad/crearCliente', CRutas.crearCliente); // RF01
router.post('/seguridad/crearTrabajador', TRutas.crear);      // RF04
router.post('/seguridad/crearAdmin', ARutas.crear);
router.post('/seguridad/loginAdmin', LRutas.login);
router.put('/seguridad/editarHorario/:idHorario', EHRutas.editar);   // RF11
router.delete('/seguridad/eliminarHorario/:idHorario', DelHRutas.eliminar); // RF12

// RF-13: Admin desactiva y activa trabajador
router.put('/seguridad/desactivartrabajador/:id', MTRutas.modificarestado);
router.put('/seguridad/activartrabajador/:id', ATRutas.modificarestado);

module.exports = router;