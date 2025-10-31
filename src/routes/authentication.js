const express = require("express");
const router = express.Router();
const userSchema = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Ruta para el registro de usuario (ya tienes esta)
router.post("/signup", async (req, res) => {
  const { usuario, correo, clave } = req.body;
  const user = new userSchema({ usuario, correo, clave });

  // Encriptamos la clave antes de guardarla
  user.clave = await user.encryptClave(user.clave);
  await user.save();

  // Generar el token JWT
  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });

  res.json({ auth: true, token });
});

router.post("/login", async (req, res) => {
  const { correo, clave } = req.body;

  // Buscar el usuario por correo
  const user = await userSchema.findOne({ correo });
  if (!user) {
    return res.status(400).json({ message: "Correo o contraseña incorrectos usuario" });
  }

  // Comparar la clave ingresada con la clave almacenada (encriptada)
  console.log("Clave ingresada:", user.clave);
  const isMatch = await bcrypt.compare(clave, user.clave);
  if (!isMatch) {
    return res.status(400).json({ message: "Correo o contraseña incorrectos clave" });
  }

  // Generar el token JWT si las credenciales son correctas
  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });

  // Enviar el token como respuesta
  res.status(200).json({ auth: true, token });
});

module.exports = router;
