const { Router } = require('express');
const {usuariosGet, usuariosPut, usuariosPost, usuarioDelete} = require("../controllers/usuarios.controller");

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.delete('/', usuarioDelete );

module.exports = router;