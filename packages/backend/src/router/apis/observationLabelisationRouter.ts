import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';
import { observationLabelisationController } from '../../controller';

export const observationLabelisationRouter = express.Router();

observationLabelisationRouter.get('/', observationLabelisationController.getLabelisations);
observationLabelisationRouter.post('/', authenticateUser, observationLabelisationController.createLabelisation);
observationLabelisationRouter.get('/:id', authenticateUser, observationLabelisationController.getLabelisationById);
observationLabelisationRouter.delete('/:id', authenticateUser, observationLabelisationController.deleteLabelisation);
