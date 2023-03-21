const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { esRolValido, existeCorreo,existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, hasRole } = require('../middlewares/validar-roles');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos],usuariosPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    check('correo','El correo ingresado no es válido').isEmail(),
    check('correo').custom(existeCorreo),
   // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom(esRolValido),
    //validarCampos
] ,usuariosPost);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;