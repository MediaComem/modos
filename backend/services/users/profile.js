const User = require('../../models/user');
const error = require('../error');

User.schema.get('profile');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, 'profile');
        if (!user) return error.createError(res, 404, 'User does not exist');
        if (!user.profile) return error.createError(res, 404, 'Profile does not exist');
        return res.status(200).json(user.profile);
    } catch (err) {
        return error.handleError(err, res);
    }
}

const createProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return error.createError(res, 404, 'User does not exist');

        user.profile = req.body;
        const updatedUser = await user.save();

        return res.status(201).json(updatedUser.profile);
    } catch (err) {
        return error.handleError(err, res);
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user.profile) return error.createError(res, 404, 'Profile does not exist');
        if (!user) return error.createError(res, 404, 'User does not exist');

        Object.assign(user.profile, req.body);
        const updatedUser = await user.save();

        return res.status(200).json(updatedUser.profile);
    } catch (err) {
        return error.handleError(err, res);
    }
}


module.exports = {
    getProfile: getProfile,
    createProfile: createProfile,
    updateProfile: updateProfile
}
