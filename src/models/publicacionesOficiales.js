const mongoose = require("mongoose");  // Importando el componente mongoose

// Definición del esquema de publicación
const publicacionSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha_publicacion: {
    type: Date,
    default: Date.now,  // La fecha se asigna automáticamente si no se especifica
  },
  autor: {
    type: String,  // Se puede usar para almacenar el autor de la publicación (por ejemplo, nombre de la facultad)
    required: true,
  },
  imagen: {
    type: String,  // URL o ruta de la imagen. Puede estar vacío (null) si no se carga ninguna imagen
    default: null,
  },
  documento: {
    type: String,  // URL o ruta del documento (como PDF). Puede estar vacío (null)
    default: null,
  }
});

// Exportar el modelo de la publicación
module.exports = mongoose.model("Publicacion", publicacionSchema);
