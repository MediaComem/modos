const jwt = require('jsonwebtoken');
const error = require('./errors');
const { secretBase, expirationTime } = require('../configs/config');

/**
 * Creates an Express route from an async function, automatically handling
 * rejected promises.
 */
const createAsyncRoute = (asyncFunction) => {
    return async function(req, res, next) {
        try {
            await asyncFunction(req, res, next);
        } catch (err) {
            return error.handleError(err, res);
        }
    };
};

const signToken = function(userId) {
    return jwt.sign({ sub: userId }, secretBase, { expiresIn: expirationTime });
};

module.exports = {
    createAsyncRoute: createAsyncRoute,
    signToken: signToken
};
