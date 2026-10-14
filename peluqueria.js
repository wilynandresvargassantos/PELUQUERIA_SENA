const express = require('express');
const cors = require('cors');
const RutaCrearCliente = require('./vista/admin/RutaCrearCliente');
// 1. Agregamos el require:
const rutaRegistroCliente = require('./vista/cliente/RutaRegistroCliente');
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
// 2. Agregamos el app.use aquí:
app.use('/', rutaRegistroCliente);

//app.use('/seguridad', rutaadmin);
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la peluquería');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});