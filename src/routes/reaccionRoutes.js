const express = require("express");
const router = express.Router();
const Reacciones = require("../models/Reacciones"); 

// Crear reacción
router.post("/", async (req, res) => {
  try {
    const { usuario, elementoId, tipoElemento, tipoReaccion } = req.body;

    const reaccion = new Reacciones({
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

// Obtener todas
router.get("/", async (req, res) => {
  try {
    const reacciones = await Reacciones.find();
    res.json(reacciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reacciones" });
  }
});

module.exports = router; // 
