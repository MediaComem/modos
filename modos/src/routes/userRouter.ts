import * as express from 'express';
import { userController } from '../controller';
import { authenticateUser } from '../config/middlewares';

export const userRouter = express.Router();

userRouter.get('/', authenticateUser, userController.getUser);

// userRouter.post('/', userService.createUser);

// userRouter.put('/', authenticateUser, userService.updateUser);

// userRouter.delete('/', authenticateUser, userService.deleteUser);

// userRouter.get('/events', authenticateUser, userService.getUserEvents);

// userRouter.get('/observations', authenticateUser, userService.getUserObservations);

// userRouter.post('/join/:eventId', authenticateUser, userService.joinEvent);

// userRouter.get('/profile', authenticateUser, profileService.getProfile);

// userRouter.post('/profile', authenticateUser, profileService.createProfile);

// userRouter.put('/profile', authenticateUser, profileService.updateProfile);
