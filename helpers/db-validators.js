const Role = require('../models/role');
const Usuario = require('../models/usuario');
const esRolValido = async (rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}
const existeCorreo = async (correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      throw new Error(`El correo ${correo} ya está registrado`); 
    }
}

const existeUsuarioPorId = async (id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
      throw new Error(`El id ${id} no existe`); 
    }
}

const existeCategoriaPorId = async (req=request, res=response) => {
    const { id } = req.params
    const categoria = await Categoria.findById(id)
    if (!categoria) {
        throw new Error(`La categoría con id ${id} no existe`)
    }

}

module.exports ={
    esRolValido,
    existeCorreo,
    existeUsuarioPorId,
    existeCategoriaPorId
}








