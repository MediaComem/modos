import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { eventController } from '../../controller';

export const eventRouter = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.post('/', authenticateUser, eventController.createEvent);

eventRouter.get('/:id', eventController.getEventById);
eventRouter.put('/:id', authenticateUser, eventController.updateEvent);
eventRouter.delete('/:id', authenticateUser, eventController.deleteEvent);

eventRouter.get('/:id/users', eventController.getParticipants);
eventRouter.post('/:id/users', eventController.addParticipant);
eventRouter.get('/:id/observations', eventController.getObservations);
