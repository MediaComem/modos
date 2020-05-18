import express from 'express';
import { eventService } from '../../services';
import { authenticateUser } from '../../configs/middlewares';

export const eventController = express.Router();

eventController.get('/', authenticateUser, eventService.getEvents);

eventController.get('/:id', authenticateUser, eventService.getEventById);

eventController.post('/', authenticateUser, eventService.createEvent);

eventController.put('/:id', authenticateUser, eventService.updateEvent);

eventController.delete('/:id', authenticateUser, eventService.deleteEvent);

eventController.get('/:id/users', authenticateUser, eventService.getParticipants);

eventController.get('/:id/observations', authenticateUser, eventService.getObservations);
