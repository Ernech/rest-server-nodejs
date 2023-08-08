const {request,response} = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async(req=request,res=response)=>{

  
  
    try {
      const nombre = await subirArchivo(req.files,undefined,'img')
      res.json({nombre})
    } catch (error) {
      res.status(400).json({msg:error})
    }

}


const actualizarImagen = async(req=request,res=response)=>{



  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el usuario ${id}`})
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el usuario ${id}`})
      }
      break;
  
    default:
      res.status(500).json({msg:'Colección no disponible'})
  }

  //Limpiar imágenes previas.
 
  if (modelo.img){
    const pathImagen =  path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)){
      fs.unlinkSync(pathImagen)
    }
  }


  const nombre = await subirArchivo(req.files,undefined,coleccion)
  modelo.img = nombre
  await modelo.save()



  res.json(modelo)

}



const mostrarImagen = async(req=request,res=response) =>{

  

  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el usuario ${id}`})
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el producto ${id}`})
      }
      break;
  
    default:
      res.status(500).json({msg:'Colección no disponible'})
  }

  //Devolver imágenes previas.
 
  if (modelo.img){
    const pathImagen =  path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen)
    }
  }

  const placeholderPath = path.join(__dirname,'../assets','no-image.jpg')
  res.sendFile(placeholderPath)


}


const actualizarImagenCloudinary = async(req=request,res=response)=>{

  const {id,coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el usuario ${id}`})
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo){
        return res.status(400).json({msg:`No existen el usuario ${id}`})
      }
      break;
  
    default:
      res.status(500).json({msg:'Colección no disponible'})
  }

  //Limpiar imágenes previas.
 
  if (modelo.img){
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length-1]
    const [public_id] = nombre.split('.')
     cloudinary.uploader.destroy(public_id)
  }

  const {tempFilePath} = req.files.archivo
  const resp = await cloudinary.uploader.upload(tempFilePath)
  const {secure_url} = resp
  modelo.img = secure_url

  res.json(modelo)

}



module.exports = {cargarArchivo,actualizarImagen,mostrarImagen,actualizarImagenCloudinary}