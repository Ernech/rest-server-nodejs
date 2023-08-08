const dbValidators = require('./db-validators')
const generarJWT = require('./generarJWT')
const googleVerify = require('./google-verify')
const subirArchivos = require('./subir-archivo')

module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivos
}