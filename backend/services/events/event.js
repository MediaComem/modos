const Event = require('../../models/event');
const User = require('../../models/user');
const error = require('../error');

const getEvents = async (req, res, next) => {
    Event.find({}, (err, events) => {
        if (err) return error.internalServerError(res, err);
        if (events.length > 0) {
            return res.status(200).json(events);
        }
        return error.createError(res, 404, 'No events found in the system');
    });
};

const getEventById = async (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) return error.internalServerError(res, err);
        if (event) {
            return res.status(200).json(event);
        }
        return error.createError(res, 404, 'Event does not exist');
    });
};

const createEvent = async (req, res, next) => {
    const newEvent = req.body;

    User.findById(newEvent.owner, (err, owner) => {
        if (err) return error.internalServerError(res, err);
        if (!owner) {
            return error.createError(res, 404, 'Owner does not exist');
        }

        Event.create(newEvent, (err, newEvent) => {
            if (err) return error.mongooseValidationErrorHandler(err, res);
            return res.status(201)
                .location(`api/v1/events/${newEvent._id}`)
                .json(newEvent);
        });
    });
};

const updateEvent = async (req, res, next) => {
    const eventId = req.params.id;
    const updatedEvent = req.body;



    Event.findByIdAndUpdate(eventId, updatedEvent, {
        new: true
    }, (err, updatedEvent) => {
        if (err) return error.internalServerError(res, err);
        if (!updatedEvent) {
            return error.createError(res, 404, 'Event does not exist');
        }
        return res.status(200).json(updatedEvent);
    });
};

module.exports = {
    getEvents: getEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent
}