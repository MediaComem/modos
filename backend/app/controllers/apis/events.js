const express = require('express');
const eventService = require('../../services/events/events');
const { authentifyUser } = require('../../configs/middlewares');
let router = express.Router();

router.get('/', authentifyUser, eventService.getEvents);

router.get('/:id', authentifyUser, eventService.getEventById);

router.post('/', authentifyUser, eventService.createEvent);

router.put('/:id', authentifyUser, eventService.updateEvent);

router.delete('/:id', authentifyUser, eventService.deleteEvent);

router.get('/:id/users', authentifyUser, eventService.getParticipants);

router.get('/:id/observations', authentifyUser, eventService.getObservations);

module.exports = router;
