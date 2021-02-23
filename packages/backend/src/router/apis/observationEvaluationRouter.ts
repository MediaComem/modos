import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { observationController } from '../../controller';
import { observationEvaluationController } from '../../controller';

export const observationEvaluationRouter = express.Router();

observationEvaluationRouter.get('/', observationEvaluationController.getEvaluations);
observationEvaluationRouter.post('/', authenticateUser, observationEvaluationController.createEvaluation);
observationEvaluationRouter.get('/:id', authenticateUser, observationEvaluationController.getEvaluationById);
//observationEvaluationRouter.put('/:id', authenticateUser, observationEvaluationController.updateEvaluation);
observationEvaluationRouter.delete('/:id', authenticateUser, observationEvaluationController.deleteEvaluation);
