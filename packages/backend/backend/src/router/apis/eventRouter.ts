import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { eventController } from '../../controller';

export const eventRouter = express.Router();

eventRouter.get('/', authenticateUser, eventController.getEvents);
eventRouter.post('/', authenticateUser, eventController.createEvent);

eventRouter.get('/:id', authenticateUser, eventController.getEventById);
eventRouter.put('/:id', authenticateUser, eventController.updateEvent);
eventRouter.delete('/:id', authenticateUser, eventController.deleteEvent);

eventRouter.get('/:id/users', authenticateUser, eventController.getParticipants);
eventRouter.get('/:id/observations', authenticateUser, eventController.getObservations);
