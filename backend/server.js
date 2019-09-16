const server = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');

// basic server setup
server.create(config, db);

// start the server
server.start();
