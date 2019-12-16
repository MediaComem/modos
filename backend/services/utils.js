const error = require('./error');

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

module.exports = {
    createAsyncRoute: createAsyncRoute
}