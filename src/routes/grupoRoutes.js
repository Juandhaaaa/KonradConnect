// Rutas Grupos

const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');

// Rutas CRUD
router.post('/', grupoController.crearGrupo);
router.get('/', grupoController.obtenerGrupos);
router.get('/:id', grupoController.obtenerGrupoPorId);
router.put('/:id', grupoController.actualizarGrupo);
router.delete('/:id', grupoController.eliminarGrupo);

module.exports = router; 