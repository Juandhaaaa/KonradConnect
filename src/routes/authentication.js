const express = require("express");
const router = express.Router();
const userSchema = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- REGISTRO ---
router.post("/signup", async (req, res) => {
  try {
    const { usuario, correo, clave } = req.body;

    // Verifica si ya existe el usuario
    const userExistente = await userSchema.findOne({ usuario });
    if (userExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crea y guarda el usuario
    const user = new userSchema({ usuario, correo, clave });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });
    res.json({ auth: true, token });
  } catch (error) {
    console.error("Error en /signup:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  try {
    const { usuario, clave } = req.body;

    // 1️⃣ Buscar usuario
    const user = await userSchema.findOne({ usuario });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos (usuario no encontrado)" });
    }

    // 2️⃣ Comparar claves
    const isMatch = await bcrypt.compare(clave, user.clave);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos (clave errónea)" });
    }

    // 3️⃣ Generar token JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "24h" });

    // 4️⃣ Respuesta correcta
    res.status(200).json({
      auth: true,
      message: "Inicio de sesión exitoso",
      usuario: user.usuario,
      token
    });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
