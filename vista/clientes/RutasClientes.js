const express = require('express');
const router = express.Router();

const clienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verHorarioCtrl = require('../../controlador/clientes/VerHorarioControlador');

// Endpoints de Clientes
router.post('/registro-cliente', clienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);

// RF-06: Cliente visualiza horarios
router.get('/horarios-disponibles', verHorarioCtrl.verHorarios);

module.exports = router;