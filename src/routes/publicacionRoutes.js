const express = require("express");
const router = express.Router();
const Publicacion = require("../models/publicacionesOficiales"); // Importamos el modelo

// Crear una nueva publicación (CREATE)
router.post("/", async (req, res) => {
  try {
    const publicacion = new Publicacion({
      titulo: req.body.titulo,
      contenido: req.body.contenido,
      autor: req.body.autor,
      imagen: req.body.imagen || null,
      documento: req.body.documento || null
    });

    const nuevaPublicacion = await publicacion.save();
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la publicación", error });
  }
});

// Obtener todas las publicaciones (READ ALL)
router.get("/", async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las publicaciones", error });
  }
});

// Actualizar una publicación (UPDATE)
router.put("/id", async (req, res) => {
  try {
    const id = req.query.id; // Aquí obtenemos el id del query param
    const publicacionActualizada = await Publicacion.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Devuelve la publicación actualizada
    );

    if (!publicacionActualizada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.status(200).json({
      message: "Publicación actualizada correctamente",
      data: publicacionActualizada
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la publicación", error });
  }
});

// Eliminar una publicación (DELETE)
router.delete("/id", async (req, res) => {
  try {
    const id = req.query.id; // Obtenemos el ID desde los query params (?id=...)
    const publicacionEliminada = await Publicacion.findByIdAndDelete(id);

    if (!publicacionEliminada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.status(200).json({
      message: "Publicación eliminada correctamente",
      data: publicacionEliminada
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la publicación", error });
  }
});


module.exports = router;
