const express = require('express');
const apiRoute = require('./apis');

const init = (server) => {
    server.use(function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    // POST and PUT must have a content type of application/json.
    server.use(function (req, res, next) {
        const contentType = req.get('Content-Type');
        if (['POST', 'PUT'].includes(req.method) && contentType !== 'application/json') {
            return res.status(415).json({
                'code': 415,
                'message': 'Unsupported Media Type',
                'description': 'All POST/PUT request must have a content type of application/json'
            });
        }
        return next();
    });

    server.use('/api', apiRoute);
    server.use('/landing-page', express.static('./app/public'));
}

module.exports = {
    init: init
};
