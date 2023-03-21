const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req = request, res = response) => {

    const { correo, password } = req.body;
    try {
        //console.log(correo)
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' })
        }
        //Verificar Usuario Activo
        if (!usuario.estado) {

            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos - estado:false' });
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ msg: 'Usuario o contraseña incorrectos - password' })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);


        res.json({ usuario, token })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error, Hable con el administrador' })
    }


};

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body
    try {
        const { nombre, img, correo } = await googleVerify(id_token)
    
        let user = await Usuario.findOne({ correo })
    
        if (!user) {
            let data = {
                nombre,
                img,
                password: ':p',
                img,
                google: true,
                correo,
                rol:"USER_ROL"
            }
            user = new Usuario(data)
            await user.save()
        }

        if (!user.estado) {
            return res.status(401).json({ msg: 'Hable con el administrador, usuario bloqueado' })
        }


        const token = await generarJWT(user.id);

        return res.json({ user, token })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'No se pudo verificar el token'
        })
    }


}



module.exports = { login, googleSignIn }