const express = require('express');
const router = express.Router();

const clienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verHorarioCtrl = require('../../controlador/clientes/VerHorarioControlador');
const desactivarClienteCtrl = require('../../controlador/clientes/DesactivarClienteControlador');

// Endpoints de Clientes
router.post('/registro-cliente', clienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);
router.get('/horarios-disponibles', verHorarioCtrl.verHorarios);

// RF-07: Cliente desactiva su cuenta
router.put('/desactivar-cuenta/:id', desactivarClienteCtrl.desactivar);

module.exports = router;