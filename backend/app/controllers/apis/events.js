const express = require('express');
const eventService = require('../../services/events/events');
const { authenticateUser } = require('../../configs/middlewares');
const router = express.Router();

router.get('/', authenticateUser, eventService.getEvents);

router.get('/:id', authenticateUser, eventService.getEventById);

router.post('/', authenticateUser, eventService.createEvent);

router.put('/:id', authenticateUser, eventService.updateEvent);

router.delete('/:id', authenticateUser, eventService.deleteEvent);

router.get('/:id/users', authenticateUser, eventService.getParticipants);

router.get('/:id/observations', authenticateUser, eventService.getObservations);

module.exports = router;
