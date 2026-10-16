const express = require('express');
const router = express.Router();
const crearAdminCtrl = require('../../controlador/admin/CrearAdminControlador');
const loginAdminCtrl = require('../../controlador/admin/LoginAdminControlador');

// Crear Admin inicial y Login de Admin
router.post('/crear-admin', crearAdminCtrl.crear);
router.post('/login-admin', loginAdminCtrl.login);

module.exports = router;