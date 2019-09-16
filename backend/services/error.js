const createError = (res, code, message) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
}

const internalServerError = (res) => {
    return res.status(500).json({
        'code': 500,
        'description': 'Something went wrong, please try again'
    });
};

module.exports = {
    createError: createError,
    internalServerError: internalServerError
}