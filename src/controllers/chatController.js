const ChatPrivado = require('../models/ChatPrivado');

// Crear chat
exports.crearChat = async (req, res) => {
  try {
    const chat = new ChatPrivado(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ver todos los chats
exports.obtenerChats = async (req, res) => {
  const chats = await ChatPrivado.find();
  res.json(chats);
};

// Ver chat por ID
exports.obtenerChatPorId = async (req, res) => {
  const chat = await ChatPrivado.findById(req.params.id);
  res.json(chat);
};

// Agregar mensaje
exports.agregarMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatPrivado.findById(id);
    if (!chat) return res.status(404).json({ message: 'Chat no encontrado' });

    chat.mensajes.push(req.body);
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar chat
exports.eliminarChat = async (req, res) => {
  await ChatPrivado.findByIdAndDelete(req.params.id);
  res.json({ message: 'Chat eliminado correctamente' });
}; 