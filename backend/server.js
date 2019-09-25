const server = require('./configs/app')();
const config = require('./configs/config');

// basic server setup
server.create(config);

// start the server
server.start();
