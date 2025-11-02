// Controlador Grupos

const Grupo = require('../models/Grupo');

// Crear grupo
exports.crearGrupo = async (req, res) => {
  try {
    const grupo = new Grupo(req.body);
    await grupo.save();
    res.status(201).json(grupo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ver todos los grupos
exports.obtenerGrupos = async (req, res) => {
  const grupos = await Grupo.find();
  res.json(grupos);
};

// Ver grupo por ID
exports.obtenerGrupoPorId = async (req, res) => {
  const grupo = await Grupo.findById(req.params.id);
  res.json(grupo);
};

// Actualizar grupo
exports.actualizarGrupo = async (req, res) => {
  const grupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(grupo);
};

// Eliminar grupo
exports.eliminarGrupo = async (req, res) => {
  await Grupo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Grupo eliminado correctamente' });
}; 