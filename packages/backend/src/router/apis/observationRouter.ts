import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';

export const observationRouter = express.Router();

observationRouter.get('/', authenticateUser, observationController.getObservations);
observationRouter.post('/', authenticateUser, observationController.createObservation);

observationRouter.get('/obstacles', authenticateUser, observationController.getObstacles);

observationRouter.get('/:id', authenticateUser, observationController.getObservationById);
observationRouter.put('/:id', authenticateUser, observationController.updateObservation);
observationRouter.delete('/:id', authenticateUser, observationController.deleteObservation);
