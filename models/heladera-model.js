var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemAlacenaSchema = new Schema({
    _propietario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    tieneFechaExpiracion: {
        type: Boolean
    },
    fechaExpiracion: {
        type: Date
    },
    ubicacion: {
        type: String
    },
    kilocalorias: {
        type: Number
    }
});

var ItemAlacenaModel = mongoose.model('alacena', ItemAlacenaSchema);
module.exports = ItemAlacenaModel;
