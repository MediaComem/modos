var express = require('express');
var router = express.Router();
const models = require('../models');

const eventModel = models.sequelize.model('event');
const userEventModel = models.sequelize.model('userEvent');


function createEvent(req, res, next) {
  eventModel.create(req.body)
    .then(function (event) {
      userEventModel.create({ userId: req.body.userId, eventId: event.id })
        .then(function (userEvent) {
          res.status(201).location(`v1/events/${event.id}`).json(event)
        })
        .catch(function (err) {
          next(err);
        });
    })
    .catch(function (err) {
      next(err);
    });
}

function listEvents(req, res, next) {
  eventModel.findAll()
    .then(function (events) {
      res.status(200).json(events);
    })
    .catch(function (err) {
      next(err);
    });
}

function getEventById(req, res, next) {
  eventModel.findByPk(req.params.eventId, { rejectOnEmpty: true })
    .then(function (event) {
      res.status(200).json(event)
    })
    .catch(function (err) {
      next(err);
    });
}

function updateEvent(req, res, next) {
  eventModel.update(req.body, { where: { id: req.params.eventId } })
    .then(function () {
      res.status(204).send();
    })
    .catch(function (err) {
      next(err);
    });
}

function deleteEvent(req, res, next) {
  eventModel.destroy({ where: { id: req.params.eventId } })
    .then(function () {
      res.status(204).send();
    })
    .catch(function (err) {
      next(err);
    });
}

function getUsersFromEvent(req, res, next) {
  userEventModel.findAll({ where: { eventId: req.params.eventId } })
    .then(function (users) {
      res.status(200).json(users);
    })
    .catch(function (err) {
      next(err);
    });
}

function getObservationsFromEvent(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.findAll({ where: { eventId: req.params.eventId } })
    .then(function (observations) {
      res.status(200).json(observations);
    })
    .catch(function (err) {
      next(err);
    });
}

router.post('/', createEvent);
router.get('/', listEvents);
router.get('/:eventId', getEventById);
router.put('/:eventId', updateEvent);
router.delete('/:eventId', deleteEvent);
router.get('/:eventId/users', getUsersFromEvent);
router.get('/:eventId/observations', getObservationsFromEvent);

module.exports = router;
