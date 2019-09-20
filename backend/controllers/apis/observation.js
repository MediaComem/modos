const express = require('express');
const observationService = require('../../services/observations/observation');
let router = express.Router();

router.get('/', observationService.getObservations);

router.get('/:id', observationService.getObservationsById);

router.post('/', observationService.createObservation);

router.put('/:id', observationService.updateObservation);

router.delete('/:id', observationService.deleteObservation);

router.options('/obstacles', observationService.getObstacles);

module.exports = router;
