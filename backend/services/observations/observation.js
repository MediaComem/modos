const fs = require('fs');
const path = require('path');
const Observation = require('../../models/observation');
const User = require('../../models/user');
const Event = require('../../models/event');
const error = require('../error');
const config = require('../../configs/config')

const getObservations = async (req, res) => {
    try {
        const observations = await Observation.find({});
        if (observations.length > 0) return res.status(200).json(observations);
        return error.createError(res, 404, 'No observations found in the system');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const getObservationById = async (req, res) => {
    try {
        const observation = await Observation.findById(req.params.id);
        if (observation) return res.status(200).json(observation);
        return error.createError(res, 404, 'Observation does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const createObservation = async (req, res) => {
    try {
        const owner = await User.findById(req.body.owner);
        if (!owner) return error.createError(res, 404, 'Observation\'s owner does not exist');

        // Decode base64 images and write them to disk
        for (const image of req.body.images) {
            const imagePath = path.join(config.storageDirectory, String(Date.now()) + config.imageFormat);
            image.imagePath = imagePath

            const decodedData = Buffer.from(image.base64image, 'base64');
            await fs.promises.writeFile(imagePath, decodedData);
        }

        const newObservation = await Observation.create(req.body);

        // If the request has an event field, add the observation to the referenced event.
        if (req.body.event) {
            const event = await Event.findById(req.body.event);
            if (!event) return error.createError(res, 404, 'event does not exist');
            event.observations.push(newObservation._id);
            event.save();
        }

        return res.status(201)
            .location(`api/v1/observations/${newObservation._id}`)
            .json(newObservation);
    } catch (err) {
        return error.handleError(err, res);
    }
};

const updateObservation = async (req, res) => {
    try {
        const observationId = req.params.id;
        const updatedObservation = await Observation.findByIdAndUpdate(observationId, req.body, {
            new: true
        });
        if (updatedObservation) res.status(200).json(updatedObservation);
        return error.createError(res, 404, 'Observation does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const deleteObservation = async (req, res) => {
    try {
        const observation = await Observation.findByIdAndRemove(req.params.id);
        if (observation) return res.status(204).json({});
        return error.createError(res, 404, 'Observation does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const getObstacles = async (req, res) => {
    try {
        const obstacles = await Observation.schema.obj.descriptions[0].obj.obstacle.enum;
        if (obstacles) return res.status(200).json(obstacles);
        return error.createError(res, 404, 'Obstacles does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

module.exports = {
    getObservations: getObservations,
    getObservationById: getObservationById,
    createObservation: createObservation,
    updateObservation: updateObservation,
    deleteObservation: deleteObservation,
    getObstacles: getObstacles
}
