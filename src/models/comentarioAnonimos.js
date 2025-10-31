const mongoose = require("mongoose");  // Importando el componente mongoose

const comentarioSchema = mongoose.Schema({
  contenido: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  visibleAnonimo: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Comentario", comentarioSchema);