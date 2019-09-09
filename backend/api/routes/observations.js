var express = require('express');
var router = express.Router();
const models = require('../models');

function createObservation(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  const newObservation = { userId: req.body.userId, eventId: req.body.eventId };
  observationModel.create(newObservation)
    .then(function (observation) {
      res.status(201).location(`v1/observations/${observation.id}`).json(observation);
    })
    .catch(function (err) {
      next(err);
    });
}

function listObservations(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.findAll()
    .then(function (observations) {
      res.status(200).json(observations);
    })
    .catch(function (err) {
      next(err);
    });
}

function getObservationById(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.findByPk(req.params.observationId, { rejectOnEmpty: true }).then(function (observation) {
    res.status(200).json(observation);
  }).catch(function (err) {
    next(err);
  });
}

function updateObservation(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.update(req.body, { where: { id: req.params.observationId } }).then(function () {
    res.status(204).send();
  }).catch(function (err) {
    next(err);
  });
}

function deleteObservation(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.destroy({ where: { id: req.params.observationId } }).then(function () {
    res.status(204).send();
  }).catch(function (err) {
    next(err);
  });
}

router.post('/', createObservation);
router.get('/', listObservations);
router.get('/:observationId', getObservationById);
router.put('/:observationId', updateObservation);
router.delete('/:observationId', deleteObservation);

module.exports = router;
