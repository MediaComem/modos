import express from 'express';
import { userService, profileService } from '../../services/';
import { authenticateUser } from '../../configs/middlewares';

export const userController = express.Router();

userController.get('/', authenticateUser, userService.getUser);

userController.post('/', userService.createUser);

userController.put('/', authenticateUser, userService.updateUser);

userController.delete('/', authenticateUser, userService.deleteUser);

userController.get('/events', authenticateUser, userService.getUserEvents);

userController.get('/observations', authenticateUser, userService.getUserObservations);

userController.post('/join/:eventId', authenticateUser, userService.joinEvent);

userController.get('/profile', authenticateUser, profileService.getProfile);

userController.post('/profile', authenticateUser, profileService.createProfile);

userController.put('/profile', authenticateUser, profileService.updateProfile);
