var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());

var alacena_routes = require('./routes/alacena-routes');
var usuario_routes = require('./routes/usuario-routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/alacena', alacena_routes);
app.use('/usuario', usuario_routes);

module.exports = app;