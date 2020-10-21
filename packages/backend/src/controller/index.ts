import { UserController } from './UserController';
import { ProfileController } from './ProfileController';
import { EventControler } from './EventController';
import { ObservationController } from './ObservationsController';
import { RootController } from './RootController';
import { ItineraryControler } from './ItineraryController';

const eventController = new EventControler();
const observationController = new ObservationController();
const profileController = new ProfileController();
const userController = new UserController();
const rootController = new RootController();
const itineraryController = new ItineraryControler();

export {
    eventController,
    observationController,
    profileController,
    userController,
    rootController,
    itineraryController
};