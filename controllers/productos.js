const {request,response} = require('express')
const {Producto} = require('../models/index')

const crearProducto = async(req=request,res=response)=>{

    const {estado,usuario,...data} = req.body

    const productoDB = await Producto.findOne({nombre:data.nombre.toUpperCase(),estado:true})

    if(productoDB){
        res.status(400).json({msg:`El producto ${productoDB.nombre} ya existe`})
    }

    

    const producto = new Producto({...data,nombre:data.nombre.toUpperCase(),usuario:req.usuario._id})

   await producto.save()
   res.json({producto})

}

const obtenerProductoPorId = async(req=request,res=response)=>{
    const {id} = req.params

    const producto = await Producto.findOne({_id:id,estado:true})

    res.json(producto)
}

const modificarProducto = async(req=request,res=response)=>{

    const {id} = req.params
    const {estado,usuario,...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario=req.usuario._id

    const producto= await Producto.findByIdAndUpdate(id,data)
    res.json(producto)
}

const obtenerProductos = async(req=request,res=response)=>{

    const {limite = 5, desde = 0} = req.query

    const [total,productos] = await Promise.all([Producto.countDocuments({estado:true}),Producto.find({estado:true}).populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))])

    res.json({total,productos})


}

const eliminarProducto = async(req=request,res=response)=>{

    const {id} = req.params

    const producto = await Producto.findByIdAndUpdate(id,{esrado:true})

    res.json({producto})

}

module.exports={crearProducto,obtenerProductos,obtenerProductoPorId,modificarProducto,eliminarProducto}