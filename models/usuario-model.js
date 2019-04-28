var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UsuarioSchema.methods.dudify = function () {
    this.usuario = this.usuario + '-dude';

    return this.usuario;
}

var UsuarioModel = mongoose.model('usuario', UsuarioSchema);
module.exports = UsuarioModel;