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

observationRouter.get('/to_evaluate',authenticateUser, observationController.getObstaclesToEvaluate);
observationRouter.get('/to_validate',authenticateUser, observationController.getObstaclesToValidate);
observationRouter.get('/to_labelise/:nb',authenticateUser, observationController.getObstaclesToLabelise);
observationRouter.get('/:id', observationController.getObservationById);

observationRouter.get('/:id/evaluations', authenticateUser, observationController.getEvaluations);
observationRouter.get('/:id/validations', authenticateUser, observationController.getValidations);
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
