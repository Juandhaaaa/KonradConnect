const express = require("express");
const router = express.Router();
const Reacciones = require("../models/Reacciones");

// Crear reacción
router.post("/", async (req, res) => {
  try {
    const reaccion = new Reacciones(req.body);
    await reaccion.save();
    res.json({ mensaje: "Reacción creada", reaccion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las reacciones
router.get("/", async (req, res) => {
  try {
    const reacciones = await Reacciones.find();
    res.json(reacciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Modificar reacción por ID (muy simple)
router.put("/:id", async (req, res) => {
  try {
    const reaccion = await Reacciones.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ mensaje: "Reacción modificada", reaccion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar reacción por ID (muy simple)
router.delete("/:id", async (req, res) => {
  try {
    await Reacciones.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Reacción eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

