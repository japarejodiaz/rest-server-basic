const express = require('express');
const cors  = require('cors');
const {dbConnection} = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/v1/users';
        // Conectar a la base de datos
        this.conectarDB();

        // Middleware
        this.middlewares();
        // llama a las routes
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());
        // Parseo json y parseo del body
        this.app.use(express.json());
        // Directorio public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, (req, res) => {
            console.log('listening on port', this.port);
        })
    }

}

module.exports =    Server;