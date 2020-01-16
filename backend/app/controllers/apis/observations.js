const express = require('express');
const observationService = require('../../services/observations/observations');
const { authenticateUser } = require('../../configs/middlewares');
const router = express.Router();

router.get('/', authenticateUser, observationService.getObservations);

router.post('/', authenticateUser, observationService.createObservation);

router.get('/obstacles', authenticateUser, observationService.getObstacles);

router.get('/:id', authenticateUser, observationService.getObservationById);

router.put('/:id', authenticateUser, observationService.updateObservation);

router.delete('/:id', authenticateUser, observationService.deleteObservation);

module.exports = router;
