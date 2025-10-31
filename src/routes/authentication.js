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