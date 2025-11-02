const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/', chatController.crearChat);
router.get('/', chatController.obtenerChats);
router.get('/:id', chatController.obtenerChatPorId);
router.post('/:id/mensaje', chatController.agregarMensaje);
router.delete('/:id', chatController.eliminarChat);

module.exports = router; 