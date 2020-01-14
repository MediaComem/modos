jwt = require('jsonwebtoken');
config = require('./config');
error = require('../services/errors');

/**
 * Middleware that verify if the request contains a JWT token in the
 * Authorization header field. If that is the case, extract the userId 
 * from the token.
 */
const authenticateUser = (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return error.sendError(res, 401, 'Unauthorized');
    const token = authorization.split(' ')[1];
    jwt.verify(token, config.secretBase, function (err, decoded) {
        if (err) return error.sendError(res, 401, 'Unauthorized');
        req.body.userId = decoded.id;
        next();
    });
};

module.exports = {
    authenticateUser: authenticateUser
};
