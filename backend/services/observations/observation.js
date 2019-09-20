const Observation = require('../../models/observation');
const User = require('../../models/user');
const error = require('../error');

const getObservations = async (req, res, next) => {
    try {
        const observations = await Observation.find({});
        if (observations.length > 0) return res.status(200).json(observations);
        return error.createError(res, 404, 'No observations found in the system');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const getObservationsById = async (req, res, next) => {
    try {
        const observation = await Observation.findById(req.params.id);
        if (observation) return res.status(200).json(observation);
        return error.createError(res, 404, 'Observation does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const createObservation = async (req, res, next) => {
    try {
        const owner = await User.findById(req.body.owner);
        if (!owner) return error.createError(res, 404, 'Observation\'s owner does not exist');

        const newObservation = await Observation.create(req.body);
        return res.status(201)
            .location(`api/v1/observations/${newObservation._id}`)
            .json(newObservation);
    } catch (err) {
        return error.handleError(err, res);
    }
};

const updateObservation = async (req, res, next) => {
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

const deleteObservation = async (req, res, next) => {
    try {
        const observation = await Observation.findByIdAndRemove(req.params.id);
        if (observation) return res.status(204).json({
            'code': 204,
            'message': `observation with id ${req.params.id} deleted successfully`
        });
        return error.createError(res, 404, 'Observation does not exist');
    } catch (err) {
        return error.handleError(err, res);
    }
};

const getObstacles = async (req, res, next) => {
    try {
        const obstacles = await Observation.schema.obj.description[0].obj.obstacle.enum;
        if (obstacles) return res.status(200).json(obstacles);
        return error.createError(res, 404, 'Obstacles does not exist');
    } catch (err) {
        console.log(err);
        return error.handleError(err, res);
    }
};

module.exports = {
    getObservations: getObservations,
    getObservationsById: getObservationsById,
    createObservation: createObservation,
    updateObservation: updateObservation,
    deleteObservation: deleteObservation,
    getObstacles: getObstacles
}
