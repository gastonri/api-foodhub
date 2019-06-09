var express = require('express');
var DiarioController = require('../controllers/diario-controller');

var api = express.Router();

// api.delete('/eliminar-item/:propietario-:id', AlacenaController.deleteItem);
api.get('/mostrar-entradas/:id', DiarioController.getEntradasDiarios);
api.post('/guardar-entrada', DiarioController.saveEntrada);

module.exports = api;
