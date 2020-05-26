import { UserController } from './UserController';
import { ProfileController } from './ProfileController';
import { EventControler } from './EventController';
import { ObservationController } from './ObservationsController';

const eventController = new EventControler();
const observationController = new ObservationController();
const profileController = new ProfileController();
const userController = new UserController();

export {
    eventController,
    observationController,
    profileController,
    userController
};