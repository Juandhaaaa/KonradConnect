// Importar dependencias
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

// Importar rutas
const authRoutes = require('./routes/authentication'); //Ruta correcta para autenticación
const  publicacionRoutes= require('./routes/publicacionRoutes'); 
const comentarioRoutes= require('./routes/comentarioRoutes');
const reaccionRoutes = require('./routes/reaccionRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');

// Middleware para leer datos en formato JSON
app.use(express.json());

// Registrar las rutas
app.use('/api', authRoutes);
app.use('/api/publicacion', publicacionRoutes);

const grupoRoutes = require('./routes/grupoRoutes');
app.use('/api/grupos', grupoRoutes); 

const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chats', chatRoutes); 

app.use('/api/comentario', comentarioRoutes);
app.use('/api/reacciones', reaccionRoutes);
app.use('/api', inscripcionRoutes);


// Conectar con la base de datos
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexión exitosa con MongoDB"))
  .catch((error) => console.log(" Error en la conexión:", error));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 