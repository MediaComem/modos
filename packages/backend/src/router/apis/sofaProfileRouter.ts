import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { sofaProfileController } from '../../controller';


export const sofaProfileRouter = express.Router();

sofaProfileRouter.get('/', authenticateUser, sofaProfileController.getSofaProfile);
sofaProfileRouter.post('/', authenticateUser, sofaProfileController.createSofaProfile);
sofaProfileRouter.put('/', authenticateUser, sofaProfileController.updateSofaProfile);
sofaProfileRouter.put('/disabledProfilesMask', authenticateUser, sofaProfileController.updateDisabledProfilesMask);
sofaProfileRouter.put('/hidePassModal', authenticateUser, sofaProfileController.updateHidePassModal);
