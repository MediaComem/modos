const User = require('../../models/user');
const Event = require('../../models/event');
const Observation = require('../../models/observation');
const error = require('../error');
const { createAsyncRoute } = require('../utils');

const getUsers = createAsyncRoute(async (req, res) => {
    const users = await User.find({});
    if (users.length > 0) return res.status(200).json(users);
    return error.createError(res, 404, 'No users found in the system');
});

const getUserById = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) return res.status(200).json(user);
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
        .location(`api/v1/users/${newUser._id}`)
        .json(newUser);
});

const updateUser = createAsyncRoute(async (req, res) => {
    const userId = req.params.id;
    const temp = {
        pseudonym: req.body.pseudonym,
        email: req.body.email,
        password: req.body.password
    };
    const updatedUser = await User.findByIdAndUpdate(userId, temp, {
        new: true,
        runValidators: true
    });
    if (updatedUser) return res.status(200).json(updatedUser);
    return error.createError(res, 404, 'User does not exist');
});


const deleteUser = createAsyncRoute(async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    console.log(user);
    if (user) return res.status(204).json({});
    return error.createError(res, 404, 'User does not exist');
});

const getUserEvents = createAsyncRoute(async (req, res) => {
    const userEvents = await Event.find({ owner: req.params.id });
    if (userEvents) return res.status(200).json(userEvents);
    return error.createError(res, 404, 'User does not exist');
});

const getUserObservations = createAsyncRoute(async (req, res) => {
    const observations = await Observation.find({ owner: req.params.id });
    if (observations) return res.status(200).json(observations);
    return error.createError(res, 404, 'User does not exist');
});

const joinEvent = createAsyncRoute(async (req, res) => {
    const user = await User.findById(req.params.id);
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
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserEvents: getUserEvents,
    getUserObservations: getUserObservations,
    joinEvent: joinEvent
}
