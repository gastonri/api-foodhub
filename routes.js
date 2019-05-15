var express = require('express');
var UsuarioController = require('./controllers/usuario-controller');

var api = express.Router();

api.post('/login', UsuarioController.getUsuarioByUsuario);
api.get('/id/:id', UsuarioController.getUsuarioById);
api.post('/sign-up', UsuarioController.setUsuarioPassword);
api.post('/datos-personales', UsuarioController.setDatosUsuarios);

module.exports = api;
