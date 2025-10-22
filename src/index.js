// Importar dependencias
const express = require('express');
const app = express();
const port = 3000;

// Importar rutas (por ejemplo, publicaciones)
const publicacionesRoutes = require('./routes/publicacionRoutes'); 

// Middleware para leer datos en formato JSON
app.use(express.json());

// Usar las rutas para las publicaciones
app.use("/api/publicaciones", publicacionesRoutes);

// Conectar con la base de datos
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log("Error en la conexión: ",error));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

