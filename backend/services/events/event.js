const Event = require('../../models/event');
const User = require('../../models/user');
const error = require('../error');

const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({});
        if (events.length > 0) return res.status(200).json(events);
        return error.createError(res, 404, 'No events found in the system');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) return res.status(200).json(event);
        return error.createError(res, 404, 'Event does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const createEvent = async (req, res, next) => {
    try {
        const owner = await User.findById(req.body.owner);
        if (!owner) return error.createError(res, 404, 'Event\'s owner does not exist');

        const newEvent = await Event.create(req.body);
        return res.status(201)
            .location(`api/v1/events/${newEvent._id}`)
            .json(newEvent);
    } catch (err) {
        return error.handleError(err, res);
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
            new: true
        });
        if (updateEvent) res.status(200).json(updatedEvent);
        return error.createError(res, 404, 'Event does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndRemove(req.params.id);
        if (event) return res.status(204).json({
            'code': 204,
            'message': `event with id ${req.params.id} deleted successfully`
        });
        return error.createError(res, 404, 'Event does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

module.exports = {
    getEvents: getEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
}