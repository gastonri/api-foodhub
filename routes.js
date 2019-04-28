var express = require('express');
var UsuarioController = require('./controllers/usuario-controller');

var api = express.Router();

api.get('/nombre/:usuario', UsuarioController.getUsuarioByNombre);
api.get('/id/:id', UsuarioController.getUsuarioById);
api.get('/crear-usuario/:usuario-:password', UsuarioController.setUsuarioPassword);

module.exports = api;