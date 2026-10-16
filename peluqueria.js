const express = require('express');
const cors = require('cors');
const RutaCrearCliente = require('./vista/admin/RutaCrearCliente');
const rutaRegistroCliente = require('./vista/cliente/RutaRegistroCliente');
const rutaLoginCliente = require('./vista/cliente/RutaLoginCliente');
const rutaCrearTrabajador = require('./vista/admin/RutaCrearTrabajador');
const rutaLoginTrabajador = require('./vista/trabajador/RutaLoginTrabajador');
//const rutaadmin = require('./vista/AdminRutas');
const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors({
    origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
}));

// Middleware para parseo de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public'))); 

// Rutas 
app.use('/', RutaCrearCliente);
app.use('/', rutaRegistroCliente);
app.use('/', rutaLoginCliente);
app.use('/', rutaCrearTrabajador);
app.use('/', rutaLoginTrabajador);
//app.use('/seguridad', rutaadmin);
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la peluquería');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});