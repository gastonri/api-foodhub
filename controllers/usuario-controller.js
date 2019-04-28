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

function setUsuarioPassword(req, res) {
    var usuario = new Usuario({
        usuario: req.params.usuario,
        password: req.params.password
    });

    usuario.save(function(err) {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        res.send('Guardado exitosamente!');
    });
}

module.exports = { getUsuarioById, getUsuarioByNombre, setUsuarioPassword };
