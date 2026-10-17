const express = require('express');
const cors = require('cors');
const RutasAdmin = require('./vista/admin/RutasAdmin');
const RutasClientes = require('./vista/clientes/RutasClientes');
const RutasTrabajadores = require('./vista/trabajadores/RutasTrabajadores');

const app = express();
const PORT = process.env.PORT || 5020;

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

// Rutas agrupadas
app.use('/', RutasAdmin);
app.use('/', RutasClientes);
app.use('/', RutasTrabajadores);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la peluquería');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});