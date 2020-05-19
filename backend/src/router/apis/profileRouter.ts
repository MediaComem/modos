import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { profileController } from '../../controller';


export const profileRouter = express.Router();

profileRouter.get('/', authenticateUser, profileController.getProfile);
profileRouter.post('/', authenticateUser, profileController.createProfile);
profileRouter.put('/', authenticateUser, profileController.updateProfile);
