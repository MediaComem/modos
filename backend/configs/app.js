const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seeders = require('../models/seeders');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config) => {
        let routes = require('../routes');
        //set all the server things
        server.set('env', config.env);
        server.set('port', config.port);

        // view engine setup
        server.set('views', path.join(__dirname, '../views'));
        server.set('view engine', 'pug');

        // add middleware to parse the json
        server.use(bodyParser.json({ type: 'application/json' }));
        server.use(bodyParser.urlencoded({
            extended: false
        }));

        // connect the database
        mongoose.connect(
            config.databaseUrl,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );

        seeders.undoAll(); // wipe out the database
        seeders.seedAll(); // populate the database with fake records

        // set up routes
        routes.init(server);

        server.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'local' ? err : {};

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
