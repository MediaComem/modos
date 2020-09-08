import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';

export const observationRouter = express.Router();

observationRouter.get('/', observationController.getObservations);
observationRouter.post('/', authenticateUser, observationController.createObservation);

observationRouter.get('/obstacles', observationController.getObstacles);

observationRouter.get('/:id', observationController.getObservationById);
observationRouter.put('/:id', authenticateUser, observationController.updateObservation);
observationRouter.delete('/:id', authenticateUser, observationController.deleteObservation);
