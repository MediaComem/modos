const express = require('express');
const eventService = require('../../services/events/event');
let router = express.Router();

router.get('/', eventService.getEvents);

router.get('/:id', eventService.getEventById);

router.post('/', eventService.createEvent);

router.put('/:id', eventService.updateEvent);

// router.delete('/:id', eventService.deleteEvent);

module.exports = router;
