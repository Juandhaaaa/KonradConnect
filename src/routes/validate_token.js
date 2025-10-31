const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("access-token");
  if (!token) return res.status(401).json({ error: "¡No tienes permisos para acceder!" });

  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next(); // Si el token es válido, pasa al siguiente middleware
  } catch (error) {
    res.status(400).json({ error: "El token no es válido" });
  }
};

module.exports = verifyToken;
