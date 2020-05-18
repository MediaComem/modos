import express from 'express';
import { observationService } from '../../services';
import { authenticateUser } from '../../configs/middlewares';

export const observationController = express.Router();

observationController.get('/', authenticateUser, observationService.getObservations);

observationController.post('/', authenticateUser, observationService.createObservation);

observationController.get('/obstacles', authenticateUser, observationService.getObstacles);

observationController.get('/:id', authenticateUser, observationService.getObservationById);

observationController.put('/:id', authenticateUser, observationService.updateObservation);

observationController.delete('/:id', authenticateUser, observationService.deleteObservation);
