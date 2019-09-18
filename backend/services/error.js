const handleError = (err, res) => {
    // check if it's a Mongoose validation error
    if (err.errors) {
        // retrieve each error message, if there are multiple errors
        const message = Object.keys(err.errors).map((key) => {
            return err.errors[key].message;
        });
        return createError(res, 422, message);
    }
    // check unique constraint violation 
    // (which is not considered as a validation error by mongo)
    if (err.code === 11000) return createError(res, 409, err.errmsg);
    return createError(res, 500, err);
};

const createError = (res, code, message) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
};

module.exports = {
    handleError: handleError,
    createError: createError
}