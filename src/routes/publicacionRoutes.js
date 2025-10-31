const express = require("express");
const router = express.Router(); // Manejador de rutas de express
const Publicacion = require("../models/publicacionesOficiales"); // Importamos el modelo de Publicación

// Crear nueva publicación oficial
router.post("/", (req, res) => {
    // Creamos la nueva publicación usando los datos de la solicitud
    const publicacion = new Publicacion({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        autor: req.body.autor,
        imagen: req.body.imagen || null, // Si no hay imagen, será null
        documento: req.body.documento || null // Si no hay documento, será null
    });

    // Guardar la publicación en la base de datos
    publicacion
        .save()
        .then((data) => res.json(data))  // Responder con los datos de la publicación guardada
        .catch((error) => res.json({ message: error }));  // Manejar cualquier error
});

module.exports = router;
