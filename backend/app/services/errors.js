const handleError = (err, res) => {
    // Check if it's a Mongoose validation error.
    if (err.errors) {
        // Retrieve each error message if there are multiple errors.
        const message = Object.keys(err.errors).map((key) => {
            return err.errors[key].message;
        });
        return sendError(res, 422, message);
    }
    // Check unique constraint violation (not considered as a validation error by mongo).
    if (err.code === 11000) return sendError(res, 409, err.errmsg);
    return sendError(res, 500, err);
};

const sendError = (res, code, message) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
};

module.exports = {
    handleError: handleError,
    sendError: sendError
}
