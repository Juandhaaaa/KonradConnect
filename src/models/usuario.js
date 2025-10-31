const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  usuario: { type: String, required: true },
  correo: { type: String, required: true },
  clave: { type: String, required: true }
});

// Método para encriptar la clave
userSchema.methods.encryptClave = async function (clave) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(clave, salt);
};

// Middleware para encriptar la clave antes de guardarla en la base de datos
userSchema.pre("save", async function (next) {
  if (this.isModified("clave")) {
    this.clave = await this.encryptClave(this.clave);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
