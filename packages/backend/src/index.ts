import { createConnection } from "typeorm";
import "reflect-metadata";

import { App } from './config/app';
import * as config from './config/config';
import * as connectionOptions from './ormconfig';

// Open a connection pool for the database.
createConnection(connectionOptions).then(async connection => {

    // Basic server setup.
    const server = new App(config);

    // Start the server.
    server.start();

}).catch(error => console.log(error));
