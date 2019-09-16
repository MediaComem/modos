const User = require('../../models/user');
const Event = require('../../models/event');
const Observation = require('../../models/observation');
const error = require('../error');


const getUsers = async (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return error.internalServerError(res, err);
        if (users.length > 0) {
            return res.status(200).json(users);
        }
        return error.createError(res, 404, 'No users found in the system');
    });
};

const getUserById = async (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return error.internalServerError(res, err);
        if (user) {
            return res.status(200).json(user);
        }
        return error.createError(res, 404, 'User does not exist');
    });
};

const createUser = async (req, res, next) => {
    const newUser = req.body;

    if (newUser.pseudonym === undefined || newUser.pseudonym === '') {
        return error.createError(res, 422, 'Pseudonym is required');
    }

    if (newUser.email === undefined || newUser.email === '') {
        return error.createError(res, 422, 'Email is required');
    }

    if (newUser.password === undefined || newUser.password === '') {
        return error.createError(res, 422, 'Password is required');
    }

    User.findOne({ 'email': newUser.email }, (err, isEmailExists) => {
        if (err) return error.internalServerError(res, err);
        if (isEmailExists) {
            return error.createError(res, 409, 'Email already exists');
        }

        User.create(newUser, (err, newUser) => {
            if (err) return error.internalServerError(res, err);
            return res.status(201)
                .location(`api/v1/users/${newUser._id}`)
                .json(newUser);
        });
    });
};

const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    User.findByIdAndUpdate(userId, updatedUser, {
        new: true,
        runValidators: true
    }, (err, updateUser) => {
        error.mongooseValidationErrorHandler(err, res);
        return res.status(200).json(updateUser);
    });
};


const deleteUser = async (req, res, next) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return error.internalServerError(res);
        if (user) {
            return res.status(204).json({
                'code': 204,
                'message': `user with id ${req.params.id} deleted successfully`,
            });
        }
        return error.createError(res, 404, 'User does not exist');
    });
};

const getUserEvents = async (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return error.internalServerError(res);
        if (user) {
            return res.status(200).json(user.events);
        }
        return error.createError(res, 404, 'User does not exist');
    });
};

const getUserObservations = async (req, res, next) => {
    Observation.find({ owner: req.params.id }, (err, observations) => {
        if (err) return error.internalServerError(res);
        if (observations) {
            return res.status(200).json(observations);
        }
        return error.createError(res, 404, 'User does not exist');
    });
}

const joinEvent = async (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return error.internalServerError(res);
        if (!user) {
            return error.createError(res, 404, 'User does not exist');
        }
        Event.findById(req.params.eventId, (err, event) => {
            if (err) return error.internalServerError(res);
            if (event) {
                user.events.push(event._id);
                user.save();

                return res.status(201).json(user.events);
            }
            return error.createError(res, 404, 'Event does not exist');
        });
    });
}

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
