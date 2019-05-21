var ItemAlacena = require('../models/heladera-model');

function deleteItem(req, res) {
    var propietarioItem = { _propietario: req.params.propietario };

    ItemAlacena.findByIdAndDelete(req.params.id)
        .then(item => {
            ItemAlacena.find(propietarioItem)
                .then(alimentosAlmacenados => {
                    return res.status(200).send({
                        message: 'Eliminado exiotsamente!',
                        alimentosAlmacenados
                    });
                })
                .catch(err => {
                    return res
                        .status(500)
                        .send({ message: 'Ocurrió un error', err });
                });
        })
        .catch(err => {
            return res.status(500).send({
                message: 'Ocurrió un error al intentar eliminar el item',
                err
            });
        });
}

function getItems(req, res) {
    var propietarioItem = { _propietario: req.params.id };

    ItemAlacena.find(propietarioItem)
        .then(alimentosAlmacenados => {
            return res.status(200).send({ alimentosAlmacenados });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Ocurrió un error', err });
        });
}

function saveItem(req, res) {
    var body = req.body;

    var item = new ItemAlacena({
        _propietario: body._propietario,
        nombre: body.nombre,
        cantidad: body.cantidad,
        fechaCompra: body.fechaCompra,
        tieneFechaExpiracion: body.tieneFechaExpiracion,
        fechaExpiracion: body.fechaExpiracion,
        ubicacion: body.ubicacion,
        kilocalorias: body.kilocalorias
    });

    item.save()
        .then(doc => {
            ItemAlacena.find({ _propietario: item._propietario })
                .then(alimentosAlmacenados => {
                    return res.status(200).send({
                        message: 'Guardado exitosamente!',
                        alimentosAlmacenados,
                        doc
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        message:
                            'Ocurrió un error al intentar devolver la lista',
                        err
                    });
                });
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: 'Ocurrió un error al intentar guardar', err });
        });
}

module.exports = {
    getItems,
    deleteItem,
    saveItem
};
