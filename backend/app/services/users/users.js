const bcrypt = require('bcrypt');
const Event = require('../../models/events');
const Observation = require('../../models/observations');
const User = require('../../models/users');
const error = require('../errors');
const { createAsyncRoute, signToken } = require('../utils');


const authenticate = createAsyncRoute(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordValid) return res.json({ code: 200, token: signToken(user._id) });
    return error.createError(res, 403, 'Unauthorized');
});

const getUser = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) return res.status(200).json(user.toResponseJSON());
    return error.createError(res, 404, 'User does not exist');
});

const createUser = createAsyncRoute(async (req, res) => {
    // Make sure the user doesn't try to modify other fields (e.g. events).
    const temp = {
        pseudonym: req.body.pseudonym,
        email: req.body.email,
        password: req.body.password
    };

    const newUser = await User.create(temp);

    return res.status(201)
        .location(`api/v1/users`)
        .json(newUser.toResponseJSON());
});

const updateUser = createAsyncRoute(async (req, res) => {
    const userId = req.body.userId;
    const temp = {
        pseudonym: req.body.pseudonym,
        email: req.body.email,
        password: req.body.password
    };
    const updatedUser = await User.findByIdAndUpdate(userId, temp, {
        new: true,
        runValidators: true
    });
    if (updatedUser) return res.status(200).json(updatedUser.toResponseJSON());
    return error.createError(res, 404, 'User does not exist');
});

const deleteUser = createAsyncRoute(async (req, res) => {
    const user = await User.findByIdAndRemove(req.body.userId);
    if (user) return res.status(204).json({});
    return error.createError(res, 404, 'User does not exist');
});

const getUserEvents = createAsyncRoute(async (req, res) => {
    const userEvents = await Event.find({ owner: req.body.userId });
    if (userEvents) return res.status(200).json(userEvents);
    return error.createError(res, 404, 'User does not exist');
});

const getUserObservations = createAsyncRoute(async (req, res) => {
    const observations = await Observation.find({ owner: req.body.userId });
    if (observations) return res.status(200).json(observations);
    return error.createError(res, 404, 'User does not exist');
});

const joinEvent = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return createError(res, 404, 'User does not exist');

    const event = await Event.findById(req.params.eventId, '_id');
    if (!event) return createError(res, 404, 'Event does not exist');
    if (user.events.includes(event._id)) {
        return error.createError(res, 422, 'User already joined the event');
    }

    user.events.push(event._id);
    const updatedUser = await user.save();
    return res.status(201).json(updatedUser);
});

module.exports = {
    authenticate: authenticate,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserEvents: getUserEvents,
    getUserObservations: getUserObservations,
    joinEvent: joinEvent
};
