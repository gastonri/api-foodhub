var ItemAlacena = require('../models/heladera-model');

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
        return res.status(200).send({message: 'Guardado exitosamente!', doc});
    })
    .catch(err => {
        return res.status(500).send({ message: 'Ocurrió un error', err});
    });
}

module.exports = {
    saveItem
};
