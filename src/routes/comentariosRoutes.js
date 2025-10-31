const express = require("express");
const router = express.Router();
const Comentario = require("../models/comentariosAnonimos");


// Crear comentario
router.post("/comentarios", (req, res) => {
  const comentario = Comentario(req.body);

  comentario.save()
  .then((data) => res.json({
    mensaje: "Comentario creado",
    comentario: data
  }))
  .catch((error) => res.json({ message: error }));
});


// Consultar todos los comentarios
router.get("/comentarios", (req, res) => {
  Comentario.find()
  .populate("creador", "nombre email")
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});


// Consultar comentario por ID
router.get("/comentarios/:id", (req, res) => {
  const { id } = req.params;

  Comentario.findById(id)
  .populate("creador", "nombre email")
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});


// Modificar comentario
router.put("/comentarios/:id", (req, res) => {
  const { id } = req.params;

  const { contenido, visibleAnonimo } = req.body;

  Comentario.updateOne(
      { _id: id },
      { $set: { contenido, visibleAnonimo } }
  )
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});


// Eliminar comentario
router.delete("/comentarios/:id", (req, res) => {
  const { id } = req.params;

  Comentario.findByIdAndDelete(id)
  .then((data) => res.json({
    mensaje: "Comentario eliminado",
    data
  }))
  .catch((error) => res.json({ message: error }));
});

module.exports = router;
