const {request,response, query} = require('express');


const usuariosGet =  (req = request, res=response) => {
    const {q,nombre,page=1,limit=10} = req.query;
    res.json({ msg: 'get api-controlador',q,nombre ,page,limit})
};


const usuariosPost =  (req = request, res=response) => {
    const {nombre,edad}  = req.body;
    res.json({ msg: 'post api-controlador',nombre,edad })
};


const usuariosPut =  (req = request, res=response) => {
    const id = req.params.id;
    res.json({ msg: 'put api-controlador' ,id:id})
};

const usuariosDelete =  (req = request, res=response) => {
    res.json({ msg: 'delete api-controlador' })
};

const usuariosPatch =  (req = request, res=response) => {
    res.json({ msg: 'patch api-controlador' })
};



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}

