const mongoose = require("mongoose");

const ComentarioAnonimoSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("ComentarioAnonimo", ComentarioAnonimoSchema);
