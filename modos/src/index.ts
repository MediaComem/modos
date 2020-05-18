import { App } from './config/app';
import { createConnection } from "typeorm";
import "reflect-metadata";
import * as config from './config/config';


createConnection().then(async connection => {

    // Basic server setup.
    const server = new App(config);

    // Start the server.
    server.start();

}).catch(error => console.log(error));
