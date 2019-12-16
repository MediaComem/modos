const User = require('../../models/user');
const error = require('../error');
const { createAsyncRoute } = require('../utils');

User.schema.get('profile');

const getProfile = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.params.id, 'profile');
    if (!user) return error.createError(res, 404, 'User does not exist');
    if (!user.profile) return error.createError(res, 404, 'Profile does not exist');
    return res.status(200).json(user.profile);
});

const createProfile = createAsyncRoute(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return error.createError(res, 404, 'User does not exist');

    user.profile = req.body;
    const updatedUser = await user.save();

    return res.status(201).json(updatedUser.profile);
});

const updateProfile = createAsyncRoute(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user.profile) return error.createError(res, 404, 'Profile does not exist');
    if (!user) return error.createError(res, 404, 'User does not exist');

    Object.assign(user.profile, req.body);
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser.profile);
});


module.exports = {
    getProfile: getProfile,
    createProfile: createProfile,
    updateProfile: updateProfile
}
