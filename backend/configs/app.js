const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seeders = require('../models/seeders');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config, db) => {
        let routes = require('../routes');
        //set all the server things
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

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
            db.database,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );

        seeders.seedAll();

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
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};
