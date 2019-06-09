var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EntradaDiarioSchema = new Schema({
    _propietario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    dia: {
        type: String,
        required: true
    },
    totalPrecio: {
        type: Number
    },
    comidas: [
        {
            tipoComida: {
                type: String,
                required: true
            },
            comida: {
                type: String,
                required: true
            },
            hora: {
                type: String,
                required: true
            },
            porcion: {
                type: Number
            },
            kilocalorias: {
                type: Number
            },
            precio: {
                type: Number
            },
            liquido: {
                type: Number
            }
        }
    ]
});

EntradaDiarioSchema.statics.porcionDia = function() {
    var totalPorcion;
    this.comidas.forEach(comida => {
        totalPorcion += comida.porcion;
    });

    return totalPorcion;
};

var EntradaDiarioModel = mongoose.model('diarioEntrada', EntradaDiarioSchema);
module.exports = EntradaDiarioModel;
