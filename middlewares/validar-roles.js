const { request, response } = require("express");


const esAdminRol = (req = request,res = response,next)=>{

    if(!req.usuario){

        return res.status(500).json({msg:"Se debe veirifcar el rol son validar el token primero"}); 
    }

    const {rol,nombre} = req.usuario;

    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({msg: `${nombre} no tiene permisos de administrador`});
    }



    next()
} 

const hasRole=(...roles)=>{

    
    return (req=request,res=response,next)=>{
        
        if(!req.usuario){

            return res.status(500).json({msg:"Se debe veirifcar el rol son validar el token primero"}); 
        }
    
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg:`El servicio requiere uno de estos roles ${roles}`})
        }
    
        
        next()
    }
}

module.exports={esAdminRol,hasRole}