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

function getUsuarioByUsuario(req, res) {
    var usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    };

    Usuario.find(usuario).select('-password -datosPersonales')
    .then(doc => {
        if (!doc) return res.status(404).send({ message: 'Usuario no encontrado' });
        res.send(doc);
    })
    .catch(err => {
        return res.status(500).send({ message: 'Error en la petición', err});
    });
}

function setUsuarioPassword(req, res) {
    var usuario = new Usuario({
        usuario: req.body.usuario,
        password: req.body.password
    });

    usuario.save(function(err) {
        if (err)
            return res.status(500).send({ message: 'Error en la petición' });
        res.send('Guardado exitosamente!');
    });
}

function setDatosUsuarios(req, res) {
    var body = req.body;
    var datosUsuario = new Usuario({
        usuario: body.usuario,
        datosPersonales: {
            nombre: body.datosPersonales.nombre,
            apellido: body.datosPersonales.apellido,
            fechaNacimiento: body.datosPersonales.fechaNacimiento,
            altura: body.datosPersonales.altura,
            peso: body.datosPersonales.peso
        }
    });

    Usuario.findOneAndUpdate(
        { usuario: datosUsuario.usuario },
        {
            $set: {
                datosPersonales: datosUsuario.datosPersonales
            }
        },
        {rawResult: true, new: true}
    ).select('-password')
    .then(doc => {
        if (doc) {
            return res.status(200).send(doc);
        } else {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }
    });
}

module.exports = {
    getUsuarioById,
    getUsuarioByUsuario,
    setUsuarioPassword,
    setDatosUsuarios
};
