const Role = require("../models/role.models");
const User = require("../models/user.model");


const esRoleValido = async(role='') => {
    const existeRole = await Role.findOne({ role: role });
    if (!existeRole) {
        throw new Error(`El rol ${ role } no esta registrado en la BD`);
    }
}

const emailExists = async(email = '') => {
    const userExisteMail = await User.findOne({email});
    if(userExisteMail){
        throw new Error(`El correo ${ email } ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id = '') => {
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRoleValido,
    emailExists,
    existeUsuarioPorId
}