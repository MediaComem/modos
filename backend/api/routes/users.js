var express = require('express');
var router = express.Router();
const models = require('../models')


router.post('/', function(req, res, next) {
  const userModel = models.sequelize.model('user');
  userModel.create(req.body).then(function(user) {
    res.status(201).location(`v1/users/${user.id}`).json(user)
  }).catch(function(err) {
    next(err);
  });
});


router.get('/:userId', function(req, res, next) {
  const userModel = models.sequelize.model('user');
  userModel.findByPk(req.params.userId, { rejectOnEmpty: true }).then(function(user) {
    res.status(200).json(user); 
  }).catch(function(err) {
    next(err);
  });
});


router.put('/:userId', function(req, res, next) {
  const userModel = models.sequelize.model('user');
  userModel.update(req.body, { where: { id: req.params.userId }}).then(function() {
    res.status(204).send();
  }).catch(function(err) {
    next(err);
  });
});


router.delete('/:userId', function(req, res, next) {
  const userModel = models.sequelize.model('user');
  userModel.destroy({ where: { id: req.params.userId } }).then(function() {
    res.status(204).send();
  }).catch(function(err) {
    next(err);
  });
});


router.get('/:userId/events', function(req, res, next) {
  const userEventModel = models.sequelize.model('userEvent');
  const eventModel = models.sequelize.model('event');

  userEventModel.findAll({ 
    where: { userId: req.params.userId }, 
    attributes: [ 'eventId' ] 
  }).then(function(userEvents) {
    
    // the ids of the events in which the user take part
    const eventsId = userEvents.map(userEvent => userEvent.eventId);
    
    eventModel.findAll({
      where: { id: eventsId }
    }).then(function(events) {
      res.status(200).json(events);
    }).catch(function(err) {
      next(err);
    });
  }).catch(function(err) {
    next(err)
  });
});

router.post('/:userId/join/:eventId', function(req, res, next) {
  const userEventModel = models.sequelize.model('userEvent');
  userEventModel.create(req.params).then(function(userEvent) {
    res.status(201).json(userEvent) // TODO: add location header to the res
  }).catch(function(err) {
    next(err);
  });
});

router.get('/:userId/observations', function(req, res, next) {
  const observationModel = models.sequelize.model('observation');
  observationModel.findAll({ where: { userId: req.params.userId }}).then(function(observations) {
    res.status(200).json(observations);
  }).catch(function(err) {
    next(err);
  });
});

module.exports = router;
