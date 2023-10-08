const { response, request} = require('express');

const usuariosGet = (req = request, res = response) => {


    const {q, nombre, apikey, page = 1, limit} = req.query;

    res.status(201).json({
        msg: 'es un get - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}


const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'es un put - Controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre,edad} = req.body;

    res.json({
        msg: 'es un post - Controlador',
      //      bodyy: body,
        nombre,
        edad

    });
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'es un delete - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuarioDelete
}

