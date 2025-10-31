const mongoose = require("mongoose");

const ReaccionSchema = new mongoose.Schema({
  usuario: {
    type: String, 
    required: true
  },
  elementoId: { 
    type: String,
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


module.exports = mongoose.model("Reaccion", ReaccionSchema);
