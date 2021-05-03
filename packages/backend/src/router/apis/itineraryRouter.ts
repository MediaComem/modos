import * as express from 'express';
import { itineraryController } from "../../controller";
// import { authenticateUser } from '../../config/middlewares';

export const itineraryRouter = express.Router();

itineraryRouter.get('/simple', itineraryController.getSimpleItinerary);
itineraryRouter.get('/simpleProfile', itineraryController.getItineraryForProfile);