const fs = require('fs');
const path = require('path');
const Observation = require('../../models/observations');
const User = require('../../models/users');
const Event = require('../../models/events');
const error = require('../errors');
const config = require('../../configs/config')
const { createAsyncRoute } = require('../utils');


const getObservations = createAsyncRoute(async (req, res) => {
    const observations = await Observation.find({});
    const observationsResponse = observations.map(observation => observation.toObject());
    if (observations.length > 0) return res.status(200).json(observationsResponse);
    return error.sendErrorr(res, 404, 'No observations found in the system');
});

const getObservationById = createAsyncRoute(async (req, res) => {
    const observation = await Observation.findById(req.params.id);
    if (observation) return res.status(200).json(observation.toObject());
    return error.sendErrorr(res, 404, 'Observation does not exist');
});

const createObservation = createAsyncRoute(async (req, res) => {
    const observation = Observation();
    observation.owner = req.body.userId;
    observation.description = req.body.description;
    observation.location = req.body.location;
    await observation.saveImage(req.body.imageData);

    const newObservation = await Observation.create(observation);

    // If the request has an event field, add the observation to the referenced event.
    if (req.body.event) {
        const event = await Event.findById(req.body.event);
        if (!event) return error.sendErrorr(res, 404, 'event does not exist');
        event.observations.push(newObservation._id);
        event.save();
    }

    return res.status(201)
        .location(`api/v1/observations/${newObservation._id}`)
        .json(newObservation.toObject());
});

const updateObservation = createAsyncRoute(async (req, res) => {
    const observationId = req.params.id;
    const updatedObservation = await Observation.findByIdAndUpdate(observationId, req.body, {
        new: true
    });
    if (updatedObservation) res.status(200).json(updatedObservation.toObject());
    return error.sendErrorr(res, 404, 'Observation does not exist');
});

const deleteObservation = createAsyncRoute(async (req, res) => {
    const observation = await Observation.findByIdAndRemove(req.params.id);
    if (observation) return res.status(204).json({});
    return error.sendErrorr(res, 404, 'Observation does not exist');
});

const getObstacles = createAsyncRoute(async (req, res) => {
    const obstacles = await Observation.schema.obj.descriptions[0].obj.obstacle.enum;
    if (obstacles) return res.status(200).json(obstacles);
    return error.sendErrorr(res, 404, 'Obstacles does not exist');
});

module.exports = {
    getObservations: getObservations,
    getObservationById: getObservationById,
    createObservation: createObservation,
    updateObservation: updateObservation,
    deleteObservation: deleteObservation,
    getObstacles: getObstacles
}
