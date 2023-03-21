const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre, page = 1, limit = 10 } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    //    const usuarios = await Usuario.find({estado:true})
    //    .skip(Number(desde))
    //    .limit(Number(limite));
    //    const total = await Usuario.countDocuments({estado:true}); 
    const [total, usuarios] = await Promise.all([Usuario.countDocuments({ estado: true }), Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))]);
    res.json({ total, usuarios })
};


const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
         nombre, 
         correo, 
         password, 
         rol });
    //Verificar si el correo ya existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({ msg: 'Ese correo ya está registrado' });
    }

    //Encriptar contraeña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar db
    await usuario.save();
    res.json({ msg: 'Usuario guardado', usuario })
};


const usuariosPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra BBDD
    if (password) {
        //Encriptar contraeña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario)
};

const usuariosDelete = async(req = request, res = response) => {
    const {id} = req.params;

  
    //Eliminación física
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({usuarioEliminado:usuario,usuarioAutenticado:req.usuario});

};

const usuariosPatch = (req = request, res = response) => {
    res.json({ msg: 'patch api-controlador' })
};



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}

