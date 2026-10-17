const express = require('express');
const CRutas = require('../../controlador/admin/CrearClienteControlador');
const TRutas = require('../../controlador/admin/CrearTrabajadorControlador');
const ARutas = require('../../controlador/admin/CrearAdminControlador');
const LRutas = require('../../controlador/admin/LoginAdminControlador');

const router = express.Router();

router.post('/seguridad/crearCliente', CRutas.crearCliente); // RF01
router.post('/seguridad/crearTrabajador', TRutas.crear);      // RF04 (o TRutas.crearTrabajador según tu función)
router.post('/seguridad/crearAdmin', ARutas.crear);          // (o ARutas.crearAdmin)
router.post('/seguridad/loginAdmin', LRutas.login);          // (o LRutas.validarCredencial)

module.exports = router;