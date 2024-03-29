const express = require('express')
var cors = require('cors');
const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            authPath:'/api/auth',
            users:'/api/user',
            categorias:'/api/categoria',
            productos:'/api/producto',
            buscar:'/api/buscar',
            uploads:'/api/uploads'
        }
        // this.usersPath ='/api/users';
        // this.authPath ='/api/auth';
        //Conectar a base de datos
        this.conectarDb();
        //Middlewares
        this.middlewares();
        //Rutas de la aplicación
        this.routes();
    }
    middlewares() {
        //Cors
        this.app.use(cors());
        //Parseo y lectura del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true

        }));
    }

    routes() {

        this.app.use(this.paths.users,require('../routes/user'));
        this.app.use(this.paths.authPath,require('../routes/auth'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.buscar,require('../routes/buscar'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriento en', this.port);
        });
    }
    async conectarDb(){
        await dbConnection()
    }

}


module.exports = Server