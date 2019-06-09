var express = require('express');
var RecetaCotroller = require('../controllers/receta-controller');

var api = express.Router();

api.post('/editar-receta/:id', RecetaCotroller.editReceta);
api.post('/guardar-receta', RecetaCotroller.saveReceta);
api.get('/mostrar-recetas/:id', RecetaCotroller.getItems);

module.exports = api;
