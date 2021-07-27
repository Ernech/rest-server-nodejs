const express = require('express')
var cors = require('cors');
const {dbConnection} = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath ='/api/users'
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
    }

    routes() {


        this.app.use(this.usersPath,require('../routes/user'));

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