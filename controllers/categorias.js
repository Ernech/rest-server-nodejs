const {response} = require('express')
const {Categoria} = require('../models/index')


const obtenerCategorias = async(req,res = response) =>{

    const {limite = 5, desde = 0} = req.query

    const [total,categorias] = await Promise.all([Categoria.count({estado:true}),[Categoria.find({estado:true})
        .skip(Number(limite))
        .limit(Number(desde))]])
    res.json({total,categorias})

}

const obtenerCategoriaPorId = async(req,res=response) => {
    const {id} = req.params
    const categoria = await Categoria.findById(id)
    if(!categoria){
res.status(400).json({msg:'La categortía no existe'})
    }

    res.status(201).json(categoria)
}

const crearCategoria = async(req,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();


    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        res.status(400).json({msg:`La categoría ${categoriaDB.nombre} ya existe`})
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const newCategoria = new Categoria(data)

    await newCategoria.save()

    res.status(201).json({categoria: newCategoria})
}
const actualizarCategoria = async(req,res=response)=>{
    const {id} = req.params
    const {nombre} = req.body
    const categoriaDB = await Categoria.findByIdAndUpdate(id,nombre.toUpperCase())
    res.status(201).json({categoria:categoriaDB})

}
const borrarCategoria = async(req,res=response)=>{
    const {id} = req.params
    const categoriaDB = await Categoria.findByIdAndUpdate(id,{estado:false})
    res.status(201).json({msg:"Categoría borrada",categoria:categoriaDB})
}


module.exports = {
    actualizarCategoria,
    borrarCategoria,
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId
}