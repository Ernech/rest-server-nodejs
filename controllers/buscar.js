const { request, response } = require('express')
const {ObjectId} = require('mongoose').Types
const {Usuario,Producto,Categoria} = require('../models/index')


const coleccionesPermitidas = ['usuarios', 'productos', 'categorias', 'roles']

const buscarUsuarios =async(termino='', res = response)=>{

    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const usuario = await Usuario.findById(termino)
       return res.json({results: usuario?[usuario]:[]})
    }

    const regExp = new RegExp(termino,'i')

    const usuarios = await Usuario.find({$or:[{nombre:regExp},{correo:regExp}],$and:[{estado:true}]})
    res.json({result:usuarios})


}

const buscarProductos = async(termino ='', res=response)=>{
    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre')
       return res.json({results: producto?[producto]:[]})
    }
    const regExp = new RegExp(termino,'i')
    const productos = await Producto.find({nombre:regExp,estado:true}).populate('categoria','nombre')
    res.json({results:productos?[productos]:[]})
}

const buscarCategorias = async(termino ='', res=response)=>{
    const esMongoId = ObjectId.isValid(termino)
    if(esMongoId){
        const categoria = await Categoria.findById(termino)
       return res.json({results: categoria?[categoria]:[]})
    }
    const regExp = new RegExp(termino,'i')
    const Categorias = await Categoria.find({nombre:regExp,estado:true})
    res.json({results:Categorias?[Categorias]:[]})
}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({ msg: `Las colecciones permitidas son [${coleccionesPermitidas}]` })
    }

    switch (coleccion) {
        case 'usuarios': buscarUsuarios(termino,res)
            break
        case 'productos': buscarProductos(termino,res)
            break
        case 'categorias': buscarCategorias(termino,res)
            break
        default:
            res.status(500).json({ msg: `Problemas con la búsqueda`})

    }

    
}


module.exports = {
    buscar
}