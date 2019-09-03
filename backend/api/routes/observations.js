var express = require('express');
var router = express.Router();
const models = require('../models');

router.post('/', function(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  const newObservation = { userId: req.body.userId, eventId: req.body.eventId };
  observationModel.create(newObservation).then(function(observation) {
    res.status(201).location(`v1/observations/${observation.id}`).json(observation);
  }).catch(function(err) {
    next(err);
  });
});

router.get('/', function(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.findAll().then(function(observations) {
    res.status(200).json(observations);
  }).catch(function(err) {
    next(err);
  });
});

module.exports = router; 