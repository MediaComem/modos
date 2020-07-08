import { UserController } from './UserController';
import { ProfileController } from './ProfileController';
import { EventControler } from './EventController';
import { ObservationController } from './ObservationsController';
import { RootController } from './RootController';

const eventController = new EventControler();
const observationController = new ObservationController();
const profileController = new ProfileController();
const userController = new UserController();
const rootController = new RootController();

export {
    eventController,
    observationController,
    profileController,
    userController,
    rootController
};