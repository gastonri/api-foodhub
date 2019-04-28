var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var usuario_routes = require('./routes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/usuario', usuario_routes)

module.exports = app;