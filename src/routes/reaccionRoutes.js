const express = require("express");
const router = express.Router();
const Reaccion = require("../models/Reaccion");


// Crear reacción
router.post("/", async (req, res) => {
  try {
    const { usuario, elementoId, tipoElemento, tipoReaccion } = req.body;

    const reaccion = new Reaccion({
      usuario,
      elementoId,
      tipoElemento,
      tipoReaccion
    });

    await reaccion.save();
    res.json({ mensaje: "Reacción creada", reaccion });
  } catch (error) {
    res.status(500).json({ error: "Error al crear reacción" });
  }
});


// Obtener todas las reacciones
router.get("/", async (req, res) => {
  try {
    const reacciones = await Reaccion.find().populate("usuario", "nombre email");
    res.json(reacciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reacciones" });
  }
});


// Obtener reacción por ID
router.get("/:id", async (req, res) => {
  try {
    const reaccion = await Reaccion.findById(req.params.id).populate("usuario", "nombre email");
    if (!reaccion) return res.status(404).json({ error: "Reacción no encontrada" });

    res.json(reaccion);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar reacción" });
  }
});


//  Actualizar reacción
router.put("/:id", async (req, res) => {
  try {
    const { tipoReaccion } = req.body;

    const actualizada = await Reaccion.findByIdAndUpdate(
      req.params.id,
      { tipoReaccion },
      { new: true }
    );

    if (!actualizada) return res.status(404).json({ error: "Reacción no encontrada" });

    res.json({ mensaje: "Reacción actualizada", reaccion: actualizada });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar reacción" });
  }
});


// Eliminar reacción
router.delete("/:id", async (req, res) => {
  try {
    const eliminada = await Reaccion.findByIdAndDelete(req.params.id);

    if (!eliminada) return res.status(404).json({ error: "Reacción no encontrada" });

    res.json({ mensaje: "Reacción eliminada", reaccion: eliminada });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar reacción" });
  }
});

module.exports = router;

