import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';
import { observationValidationController } from '../../controller';

export const observationValidationRouter = express.Router();

observationValidationRouter.get('/', observationValidationController.getValidations);
observationValidationRouter.post('/', authenticateUser, observationValidationController.createValidation);
observationValidationRouter.get('/:id', authenticateUser, observationValidationController.getValidationById);
//observationValidationRouter.put('/:id', authenticateUser, observationValidationController.updateEvaluation);
observationValidationRouter.delete('/:id', authenticateUser, observationValidationController.deleteValidation);
