var RecetaModel = require('../models/receta-model');

function getItems(req, res) {
    var propietarioReceta = { _propietario: req.params.id };

    RecetaModel.find(propietarioReceta)
        .then(recetasAlmacenadas => {
            return res.status(200).send({ recetasAlmacenadas });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Ocurrió un error', err });
        });
}

function editReceta(req, res) {
    var recetaId = { _id: req.params.id };
    var receta = {
        nombre: req.body.nombre,
        kilocalorias: req.body.kilocalorias,
        tiempoPreparacion: req.body.tiempoPreparacion,
        tiempoCoccion: req.body.tiempoCoccion,
        ingredientes: req.body.ingredientes,
        instrucciones: req.body.instrucciones
    };

    RecetaModel.findByIdAndUpdate(recetaId, receta)
    .then(recetaModificada => {
        return res.status(200).send({ recetaModificada });
    })
    .catch(err => {
        return res.status(500).send({ message: 'Ocurrió un error', err });
    });
}

function saveReceta(req, res) {
    var body = req.body;

    var receta = new RecetaModel({
        _propietario: body._propietario,
        nombre: body.nombre,
        cantidad: body.cantidad,
        kilocalorias: body.kilocalorias,
        tiempoPreparacion: body.tiempoPreparacion,
        tiempoCoccion: body.tiempoCoccion,
        ingredientes: body.ingredientes,
        instrucciones: body.instrucciones
    });

    receta
        .save()
        .then(doc => {
            RecetaModel.find({ _propietario: receta._propietario })
                .then(recetasAlmacenadas => {
                    return res.status(200).send({
                        message: 'Guardada exitosamente!',
                        recetasAlmacenadas,
                        doc
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        message: 'Ocurrió un error al intentar devolver la lista de recetas',
                        err
                    });
                });
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: 'Ocurrió un error al intentar guardar la receta', err });
        });
}

module.exports = {
    editReceta,
    getItems,
    saveReceta
};
