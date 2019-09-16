const error = require('../error');

const isUserValid = (res, user) => {
    if (user.pseudonym === undefined || user.pseudonym === '') {
        return error.createError(res, 422, 'Pseudonym is required');
    }

    if (user.email === undefined || user.email === '') {
        return error.createError(res, 422, 'Email is required');
    }

    if (user.password === undefined || user.password === '') {
        return error.createError(res, 422, 'Password is required');
    }

    return true;
};

module.exports = {
    isUserValid: isUserValid
}
