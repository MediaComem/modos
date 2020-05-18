import { app } from './configs/app';
import * as config from './configs/config'

const server = app();

// basic server setup
server.create(config);

// start the server
server.start();
