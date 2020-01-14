const Event = require('../../models/events');
const User = require('../../models/users');
const error = require('../errors');
const { createAsyncRoute } = require('../utils');

const getEvents = createAsyncRoute(async (req, res) => {
    let events = await Event.find({});
    if (events.length > 0) return res.status(200).json(events);
    return error.sendError(res, 404, 'No events found in the system');
});

const getEventById = createAsyncRoute(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) return res.status(200).json(event);
    return error.sendError(res, 404, 'Event does not exist');
});

const createEvent = createAsyncRoute(async (req, res) => {
    req.body.owner = req.body.userId;
    const newEvent = await Event.create(req.body);
    return res.status(201)
        .location(`api/v1/events/${newEvent._id}`)
        .json(newEvent);
});

const updateEvent = createAsyncRoute(async (req, res) => {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
        new: true,
        runValidators: true
    });
    if (updateEvent) res.status(200).json(updatedEvent);
    return error.sendError(res, 404, 'Event does not exist');
});

const deleteEvent = createAsyncRoute(async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.id);
    if (event) return res.status(204).json({});
    return error.sendError(res, 404, 'Event does not exist');
});

const getParticipants = createAsyncRoute(async (req, res) => {
    const participantsRaw = await User.find({ events: req.params.id }, 'pseudonym');
    const participants = participantsRaw.map(user => user.pseudonym);
    if (participants.length > 0) return res.status(200).json(participants);
    return error.sendError(res, 404, 'No participants to this event');
});

const getObservations = createAsyncRoute(async (req, res) => {
    const observations = await Event.findById(req.params.id, 'observations');
    if (observations.length > 0) return res.status(200).json(observations);
    return error.sendError(res, 404, 'This event has no observations');
});

module.exports = {
    getEvents: getEvents,
    getEventById: getEventById,
    createEvent: createEvent,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    getParticipants: getParticipants,
    getObservations: getObservations
}
