const { Router } = require('express');
const {usuariosGet, usuariosPut, usuariosPost, usuarioDelete} = require("../controllers/usuarios.controller");
const {check} = require("express-validator");
const {validateCampos} = require("../middlewares/validar-campos");
const Role = require("../models/role.models")
const {esRoleValido, emailExists, existeUsuarioPorId} = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validateCampos
],usuariosPut );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El formato de correo es incorrecto').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'La contrasena debe de ser mas de 6 caracteres').isLength({min:6}),
    // check('role', 'No es un Rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom( (role) => esRoleValido(role) ),
    check('role').custom( esRoleValido ),
    validateCampos
],usuariosPost );

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validateCampos
],usuarioDelete );

module.exports = router;