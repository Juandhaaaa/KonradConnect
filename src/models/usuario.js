const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  usuario: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  }
});

// Método para encriptar la clave
userSchema.methods.encryptClave = async (clave) => {
  const salt = await bcrypt.genSalt(10);  // Generamos el salt
  return bcrypt.hash(clave, salt);  // Devuelve la clave encriptada
};

// Middleware para encriptar la clave antes de guardarla en la base de datos
userSchema.pre("save", async function(next) {
  if (this.isModified("clave")) {  // Solo encripta si la clave ha cambiado
    this.clave = await this.encryptClave(this.clave);
  }
  next(); // Continúa con el proceso de guardado
});

module.exports = mongoose.model("User", userSchema);
