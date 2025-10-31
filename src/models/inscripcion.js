const mongoose = require("mongoose");

// Esquema de Inscripción
const inscripcionSchema = new mongoose.Schema({
  estudiante: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al usuario inscrito
    ref: "Usuario",
    required: true
  },
  evento: {
    type: mongoose.Schema.Types.ObjectId, // Referencia al evento al que se inscribe
    ref: "Evento",
    required: true
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now // Se pone automáticamente la fecha y hora
  },
});

// Exportar modelo
module.exports = mongoose.model("Inscripcion", inscripcionSchema);
