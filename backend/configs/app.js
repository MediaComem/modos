const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config) => {
        let routes = require('../routes');
        // Set all the server things.
        server.set('env', config.env);
        server.set('port', config.port);

        // View engine setup.
        server.set('views', path.join(__dirname, '../views'));
        server.set('view engine', 'pug');

        // Add middleware to parse the json.
        server.use(bodyParser.json({ 
            limit: config.payloadLimit,
            type: 'application/json' 
        }));
        server.use(bodyParser.urlencoded({
            limit: config.payloadLimit,
            extended: false
        }));

        // Connect the database.
        mongoose.connect(
            config.databaseUrl,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );

        // Set up routes.
        routes.init(server);

        server.use(function (err, req, res, next) {
            // Set locals, only providing error in development.
            res.locals.message = err.message;
            res.locals.error = config.env === 'development' ? err : {};

            res.status(err.status || 500);
            res.json();
        });
    };

    start = () => {
        const port = server.get('port');
        server.listen(port, function () {
            console.log('Express server listening on - http://localhost:' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};
