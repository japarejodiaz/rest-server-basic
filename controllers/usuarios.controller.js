const { response, request} = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const {validationResult} = require("express-validator");

const usuariosGet = async (req = request, res = response) => {


    // const {q, nombre, apikey, page = 1, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const stateQuery = { state : true };
    /*const users = await User.find( stateQuery )
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await User.countDocuments( stateQuery );*/

    const [total, users] = await Promise.all([
        User.countDocuments( stateQuery ),
        User.find( stateQuery )
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(201).json({
        total,
        users
    });
}


const usuariosPut = async(req = request, res = response) => {

    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;

    // Todo validar contra base de datos
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'es un put - Controlador',
        user
    });
}

const usuariosPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User(  {name, email, password, role} );

    // Verificar si correo existe
    /*const userExisteMail = await User.findOne({email});
    if(userExisteMail){
        return res.status(400).json({
            msg: 'El correo ya existe, verifique'
        });
    }*/
    // encriptar
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en base de datos

    await user.save();

    res.json({
       //      bodyy: body,
        user

    });
}

const usuarioDelete = async (req = response, res = response) => {

    const { id } = req.params;

    // borrado fisico
    // const user = await User.findByIdAndDelete( id )
    // Borrado Logico
    const user = await User.findByIdAndUpdate( id );

    res.json({
        user
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuarioDelete
}

