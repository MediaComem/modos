import { EventService } from './events/events';
import { ObservationService } from './observations/observations';
import { ProfileService } from './users/profiles';
import { UserService } from './users/users';

const eventService = new EventService();
const observationService = new ObservationService();
const profileService = new ProfileService();
const userService = new UserService();

export {
    eventService,
    observationService,
    profileService,
    userService,
};