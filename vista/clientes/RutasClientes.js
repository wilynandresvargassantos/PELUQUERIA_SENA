const express = require('express');
const router = express.Router();

const registroClienteCtrl = require('../../controlador/clientes/CrearClienteControlador');
const loginClienteCtrl = require('../../controlador/clientes/LoginClienteControlador');
const verHorarioCtrl = require('../../controlador/clientes/VerHorarioControlador');
const desactivarClienteCtrl = require('../../controlador/clientes/DesactivarClienteControlador');
const gestionCitaCtrl = require('../../controlador/clientes/GestionCitaControlador');

// Endpoints Clientes
router.post('/registro-cliente', registroClienteCtrl.registrar);
router.post('/login-cliente', loginClienteCtrl.login);
router.get('/horarios-disponibles', verHorarioCtrl.verHorarios); // 
router.put('/desactivar-cuenta/:numeroDocumento', desactivarClienteCtrl.desactivar);

// RF-15: Cliente cancela o reprograma cita
router.put('/cancelar-cita/:idCita', gestionCitaCtrl.cancelar);
router.put('/reprogramar-cita/:idCita', gestionCitaCtrl.reprogramar);

module.exports = router;