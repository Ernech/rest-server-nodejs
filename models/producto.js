const {Schema,model} = require('mongoose');

const ProductoSchema = Schema({


    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    precio:{
        type:Number,
        default:0
    },
    descripcion:{
        type:String,
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{
        type:String,
     },
    estado:{
        type:Boolean,
        default: true,
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }


});

ProductoSchema.methods.toJSON = function(){
    const {__v,estado,...data} = this.toObject();
    
    return data;
}




module.exports = model('Producto',ProductoSchema)