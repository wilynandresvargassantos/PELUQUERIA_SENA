const express = require('express');
const router = express.Router();
const controlador = require('../../controlador/cliente/LoginClienteControlador');

// RF-03: Login de cliente
router.post('/login-cliente', controlador.login);

module.exports = router;