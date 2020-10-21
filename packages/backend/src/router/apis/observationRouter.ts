import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';
import * as config from '../../config/config';
import * as path from 'path';

export const observationRouter = express.Router();

observationRouter.get('/', observationController.getObservations);
observationRouter.post(
    '/',
    authenticateUser,
    observationController.createObservation
);
observationRouter.use(
    '/images',
    express.static(path.join(config.storageDirectory))
);
observationRouter.get('/obstacles', observationController.getObstacles);
observationRouter.get(
    '/event-participants/:eventID',
    observationController.getObservationByOwnerEvent
);
observationRouter.get('/:id', observationController.getObservationById);
observationRouter.put(
    '/:id',
    authenticateUser,
    observationController.updateObservation
);
observationRouter.delete(
    '/:id',
    authenticateUser,
    observationController.deleteObservation
);
