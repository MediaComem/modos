var express = require('express');
var router = express.Router();
const models = require('../models')

const eventModel = models.sequelize.model('event');
const userEventModel = models.sequelize.model('userEvent');


router.post('/', function(req, res, next) {
  eventModel.create(req.body).then(function(event) {
    userEventModel.create({ userId: req.body.userId, eventId: event.id }).then(function(userEvent) {
      res.status(201).location(`v1/events/${event.id}`).json(event)
    }).catch(function(err) {
      next(err);
    });
  }).catch(function(err) {
    next(err);
  });
});

router.get('/', function(req, res, next) {
  eventModel.findAll().then(function(events) {
    res.status(200).json(events);
  }).catch(function(err) {
    next(err);
  });
});

router.get('/:eventId', function(req, res, next) {
  eventModel.findByPk(req.params.eventId, { rejectOnEmpty: true }).then(function(event) {
    res.status(200).json(event)
  }).catch(function(err) {
    next(err);
  });
});

module.exports = router;
