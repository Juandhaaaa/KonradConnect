const express = require("express");
const router = express.Router();
const Inscripcion = require("../models/inscripcion");

// Crear inscripción
router.post("/inscripciones", (req, res) => {
  const inscripcion = Inscripcion(req.body);
  inscripcion
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Consultar todas las inscripciones
router.get("/inscripciones", (req, res) => {
  Inscripcion.find()
    .populate("estudiante") // trae info del usuario
    .populate("evento")     // trae info del evento
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Consultar inscripción por ID
router.get("/inscripciones/:id", (req, res) => {
  const { id } = req.params;
  Inscripcion.findById(id)
    .populate("estudiante")
    .populate("evento")
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Eliminar inscripción
router.delete("/inscripciones/:id", (req, res) => {
  const { id } = req.params;
  Inscripcion.findByIdAndDelete(id)
    .then((data) => res.json({message: "Inscripción eliminada", data}))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
