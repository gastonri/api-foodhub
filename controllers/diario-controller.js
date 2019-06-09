var EntradaDiarioModel = require('../models/diario-model');
var ObjectId = require('mongoose').Types.ObjectId;

function getEntradasDiarios(req, res) {
    var propietarioDiario = { _propietario: new ObjectId(req.params.id) };

    EntradaDiarioModel.find(propietarioDiario).lean()
        .then(entradas => {

            entradas = ordenarPorFecha(entradas);
            entradas.map(sumarTotales);

            return res.status(200).send({ entradas, message: 'Busqueda ejecutada' });
        })
        .catch(err => {
            return res.status(500).send({ message: 'Ocurrió un error', err });
        });
}

function saveEntrada(req, res) {
    var body = req.body;

    var entrada = new EntradaDiarioModel({
        _propietario: body._propietario,
        dia: body.dia,
        comidas: [
            {
                tipoComida: body.comidas.tipoComida,
                comida: body.comidas.comida,
                hora: body.comidas.hora,
                porcion: body.comidas.porcion,
                kilocalorias: body.comidas.kilocalorias,
                precio: body.comidas.precio,
                liquido: body.comidas.liquido
            }
        ]
    });

    entrada
        .save()
        .then(doc => {
            EntradaDiarioModel.find({ _propietario: entrada._propietario })
                .then(entradasAlmacenadas => {
                    return res.status(200).send({
                        message: 'Guardada exitosamente!',
                        entradasAlmacenadas,
                        doc
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        message:
                            'Ocurrió un error al intentar devolver la lista de entradas del diario',
                        err
                    });
                });
        })
        .catch(err => {
            return res
                .status(500)
                .send({ message: 'Ocurrió un error al intentar guardar la entrada', err });
        });
}

function ordenarPorFecha(entradas) {
    entradas.sort(function(a, b) {
        var diaA = convertirFecha(a.dia),
            diaB = convertirFecha(b.dia);

        a = ordenarPorHora(a);
        b = ordenarPorHora(b);

        return diaA - diaB;
    });

    return entradas;
}

function ordenarPorHora(dia) {
    dia.comidas.sort(function(horaA, horaB) {
        var diaHoraA = convertirHora(horaA.hora),
            diaHoraB = convertirHora(horaB.hora);

        return diaHoraA - diaHoraB;
    });

    return dia;
}

function convertirFecha(fecha) {
    var dateParts = fecha.split('/');
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    return dateObject;
}

function convertirHora(hora) {
    var hourParts = hora.split(':');
    var hora = hourParts[0] + hourParts[1]; // + hourParts[2];

    return hora;
}

function sumarTotales(entrada) {
    var totalPrecio = 0;
    var totalPorcion = 0;
    var totalKilocalorias = 0;
    var totalLiquidos = 0;

    entrada.comidas.map(comida => {
        totalPrecio += comida.precio;
        totalPorcion += comida.porcion;
        totalKilocalorias += comida.kilocalorias;
        totalLiquidos += comida.liquido;
    });

    entrada.totalPrecio = totalPrecio;
    entrada.totalPorcion = totalPorcion;
    entrada.totalKilocalorias = totalKilocalorias;
    entrada.totalLiquidos = totalLiquidos;

    return entrada
}

module.exports = {
    getEntradasDiarios,
    saveEntrada
};
