const { Router } = require('express');
const { check } = require('express-validator');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, hasRole } = require('../middlewares/validar-roles');
const { crearProducto, obtenerProductos,obtenerProductoPorId, modificarProducto, eliminarProducto } = require('../controllers/productos');

const router = Router()



router.get('/',obtenerProductos)

router.get('/:id',[check('id','El id no es válido').isMongoId(),check('id').custom(existeProductoPorId),validarCampos],obtenerProductoPorId)

router.post('/',[validarJWT,check('nombre','El nombre es obligatorio').notEmpty(),
check('categoria','El id no es valido').isMongoId(),check('categoria').custom(existeCategoriaPorId),validarCampos],crearProducto)

router.put('/:id'[validarJWT,check('id','El id no es válido').isMongoId(),
check('id').custom(existeProductoPorId),check('nombre','El nombre es obligatorio').notEmpty(),validarCampos],modificarProducto)

router.delete('/:id',[validarJWT,check('id','El id no es válido').isMongoId(),
check('id').custom(existeProductoPorId),esAdminRol],eliminarProducto)


module.exports=router