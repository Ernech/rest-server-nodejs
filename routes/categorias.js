const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeCorreo,existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, hasRole } = require('../middlewares/validar-roles');
const { crearCategoria, borrarCategoria, actualizarCategoria, obtenerCategorias, obtenerCategoriaPorId } = require('../controllers/categorias');

const router = Router();


router.get('/',obtenerCategorias)

router.get('/:id',[check('id').custom(existeCategoriaPorId)],obtenerCategoriaPorId)

router.post('/',[validarJWT,check('nombre','EL nombre es obligatorio').not().isEmpty(),validarCampos],crearCategoria)

router.put('/:id',[validarJWT,hasRole('ADMIN_ROLE','USER_ROLE'),check('id').custom(existeCategoriaPorId)],actualizarCategoria)

router.delete('/:id',[validarJWT,esAdminRol,check('id').custom(existeCategoriaPorId)],borrarCategoria)

module.exports = router;