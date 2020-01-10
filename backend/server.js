const server = require('./app/configs/app')();
const config = require('./app/configs/config');

// basic server setup
server.create(config);

// start the server
server.start();
