const mongoose = require("mongoose");

const inscripcionSchema = new mongoose.Schema({
  estudiante: {
    type: String,
    required: true
  },
  evento: {
    type: String,
    required: true
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Inscripcion", inscripcionSchema);

