// Importar dependencias
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

// Importar rutas
const authRoutes = require('./routes/authentication'); // ✅ Ruta correcta para autenticación
const  publicacionRoutes= require('./routes/publicacionRoutes'); // ✅ Si también manejas animales o datos similares

// Middleware para leer datos en formato JSON
app.use(express.json());

// Registrar las rutas
app.use('/api', authRoutes);
app.use('/api/publicacion', publicacionRoutes);

// Conectar con la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conexión exitosa con MongoDB"))
  .catch((error) => console.log("❌ Error en la conexión:", error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

