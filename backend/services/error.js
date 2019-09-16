const mongooseValidationErrorHandler = (err, res) => {
    if (err) {
        if (err.errors) {
            // retrieve each error message, if there are multiple errors
            const message = Object.keys(err.errors).map((key) => {
                return err.errors[key].message;
            });
            return createError(res, 422, message);
        }
        return internalServerError(res, err);
    }
}

const createError = (res, code, message) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
}

const internalServerError = (res, err) => {
    return res.status(500).json({
        'code': 500,
        'description': err
    });
};

module.exports = {
    mongooseValidationErrorHandler: mongooseValidationErrorHandler,
    createError: createError,
    internalServerError: internalServerError
}