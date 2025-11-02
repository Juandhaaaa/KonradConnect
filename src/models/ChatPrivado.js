// Modelo ChatPrivado

const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  emisor: { type: String, required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  participantes: [{ type: String, required: true }],
  mensajes: [mensajeSchema],
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatPrivado', chatSchema); 