var express = require('express');
var AlacenaController = require('../controllers/alacena-controller');

var api = express.Router();

api.post('/guardar-item', AlacenaController.saveItem);
api.get('/mostrar-items/:id', AlacenaController.getItems);

module.exports = api;
