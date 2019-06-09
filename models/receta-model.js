var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecetaSchema = new Schema({
    _propietario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    kilocalorias: {
        type: Number
    },
    tiempoPreparacion: {
        type: Number
    },
    tiempoCoccion: {
        type: Number
    },
    ingredientes: {
        type: String
    },
    instrucciones: {
        type: String
    }
});

var RecetaModel = mongoose.model('receta', RecetaSchema);
module.exports = RecetaModel;


// ingredientes: [
//     {
//         ingrediente: {
//             type: String
//         },
//         cantidad: {
//             type: Number
//         },
//         tipoUnidad: {
//             type: String
//         }
//     }
// ],
