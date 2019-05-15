var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    usuario: {
        trim: true,
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    datosPersonales: {
        altura: {
            trim: true,
            type: Number
        },
        apellido: {
            trim: true,
            type: String
        },
        fechaNacimiento: {
            type: Date
        },
        nombre: {
            trim: true,
            type: String
        },
        peso: {
            trim: true,
            type: Number
        },
        sexo: {
            type: String
        }
    }
});

UsuarioSchema.methods.dudify = function() {
    this.usuario = this.usuario + '-dude';

    return this.usuario;
};

var UsuarioModel = mongoose.model('usuario', UsuarioSchema);
module.exports = UsuarioModel;
