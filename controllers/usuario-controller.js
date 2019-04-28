var Usuario = require('../models/usuario-model');

function getUsuarioById(req, res) {
    var usuarioId = req.params.id;

    Usuario.findById(usuarioId, (err, usuario) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!usuario)
            return res.status(404).send({ message: 'Usuario no encontrado' });
        res.send(usuario);
    });
}

function getUsuarioByNombre(req, res) {
    var usuarioNombre = { usuario: req.params.usuario };

    Usuario.find(usuarioNombre, (err, usuario) => {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        if (!usuario)
            return res.status(404).send({ message: 'Usuario no encontrado' });
        res.send(usuario);
    });
}

module.exports = { getUsuarioById, getUsuarioByNombre };
