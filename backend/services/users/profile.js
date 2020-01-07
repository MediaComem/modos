const User = require('../../models/user');
const error = require('../error');
const { createAsyncRoute } = require('../utils');


const getProfile = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return error.createError(res, 404, 'User does not exist');
    if (!user.profile) return error.createError(res, 404, 'Profile does not exist');
    return res.status(200).json(user.profile.toResponseJSON());
});

const createProfile = createAsyncRoute(async (req, res) => {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) return error.createError(res, 404, 'User does not exist');

    user.profile = req.body;
    const updatedUser = await user.save();

    return res.status(201).json(updatedUser.profile.toResponseJSON());
});

const updateProfile = createAsyncRoute(async (req, res) => {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) return error.createError(res, 404, 'User does not exist');
    if (!user.profile) return error.createError(res, 404, 'Profile does not exist');

    Object.assign(user.profile, req.body);
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser.profile.toResponseJSON());
});


module.exports = {
    getProfile: getProfile,
    createProfile: createProfile,
    updateProfile: updateProfile
}
