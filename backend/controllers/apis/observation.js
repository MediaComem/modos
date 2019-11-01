const express = require('express');
const observationService = require('../../services/observations/observation');
let router = express.Router();

router.get('/', observationService.getObservations);

router.post('/', observationService.createObservation);

router.options('/', observationService.getObstacles);

router.get('/:id', observationService.getObservationById);

router.put('/:id', observationService.updateObservation);

router.delete('/:id', observationService.deleteObservation);



module.exports = router;
