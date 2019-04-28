const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://@localhost:27017/foodHub', {
    useNewUrlParser: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected!');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    usuario: String,
    password: String
});

UsuarioSchema.methods.dudify = function () {
    this.usuario = this.usuario + '-dude';

    return this.usuario;
}

var Usuario = mongoose.model('usuario', UsuarioSchema);

app.get('/juan', (req, res) => {

    var juan = new Usuario({
        usuario: 'Juan',
        password: 'abc1234'
    });

    juan.dudify(function(err, usuario) {
        if (err) throw err;

        console.log('Your new name is ' + usuario);
    });

    juan.save(function (err) {
        if (err) throw err;
        res.send('guardado exitosamente!');
    });
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
