const mongoose = require("mongoose");

const ReaccionSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  elementoId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  tipoElemento: { 
    type: String, 
    enum: ["publicacion", "comentario"], 
    required: true 
  },
  tipoReaccion: {
    type: String,
    enum: ["like", "love", "aplauso", "interesante"],
    default: "like"
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Reaccion", ReaccionSchema);
