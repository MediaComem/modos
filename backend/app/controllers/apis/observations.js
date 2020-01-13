const express = require('express');
const observationService = require('../../services/observations/observations');
const { authentifyUser } = require('../../configs/middlewares');
const router = express.Router();

router.get('/', authentifyUser, observationService.getObservations);

router.post('/', authentifyUser, observationService.createObservation);

router.options('/', authentifyUser, observationService.getObstacles);

router.get('/:id', authentifyUser, observationService.getObservationById);

router.put('/:id', authentifyUser, observationService.updateObservation);

router.delete('/:id', authentifyUser, observationService.deleteObservation);

module.exports = router;
