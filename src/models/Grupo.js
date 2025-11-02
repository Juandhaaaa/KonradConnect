const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  tema: { type: String, required: true },
  creador: { type: String, required: true }, // nombre o id del usuario
  miembros: [{ type: String }], // lista de nombres o ids de usuarios
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grupo', grupoSchema); 