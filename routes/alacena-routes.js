var express = require('express');
var AlacenaController = require('../controllers/alacena-controller');

var api = express.Router();

api.delete('/eliminar-item/:propietario-:id', AlacenaController.deleteItem);
api.get('/mostrar-items/:id', AlacenaController.getItems);
api.post('/guardar-item', AlacenaController.saveItem);

module.exports = api;
