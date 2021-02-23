import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { userController } from '../../controller/';


export const userRouter = express.Router();

userRouter.get('/', authenticateUser, userController.getUser);
userRouter.post('/', userController.createUser);
userRouter.put('/', authenticateUser, userController.updateUser);
userRouter.delete('/', authenticateUser, userController.deleteUser);

userRouter.get('/events', authenticateUser, userController.getUserEvents);
userRouter.post('/join/:eventId', authenticateUser, userController.joinEvent);

userRouter.get('/observations', authenticateUser, userController.getUserObservations);
userRouter.get('/evaluations', authenticateUser, userController.getUserEvaluations);
userRouter.get('/validations', authenticateUser, userController.getUserValidations); 
