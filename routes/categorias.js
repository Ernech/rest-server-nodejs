const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeCorreo,existeUsuarioPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, hasRole } = require('../middlewares/validar-roles');
const { crearCategoria, borrarCategoria, actualizarCategoria, obtenerCategorias, obtenerCategoriaPorId } = require('../controllers/categorias');

const router = Router();


router.get('/',obtenerCategorias)

router.get('/:id',[check('id','No es un id válido').isMongoId(),check('id').custom(existeCategoriaPorId),validarCampos],obtenerCategoriaPorId)

router.post('/',[validarJWT,check('nombre','El nombre es obligatorio').not().isEmpty(),validarCampos],crearCategoria)

router.put('/:id',[validarJWT,check('id','No es un id válido').isMongoId(),check('id').custom(existeCategoriaPorId),
check('nombre','El nombre es obligatorio'),validarCampos],actualizarCategoria)

router.delete('/:id',[validarJWT,esAdminRol,check('id','No es un id válido').isMongoId(),check('id').custom(existeCategoriaPorId),validarCampos],borrarCategoria)

module.exports = router;