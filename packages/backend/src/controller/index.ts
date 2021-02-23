import { UserController } from './UserController';
import { ProfileController } from './ProfileController';
import { SofaProfileController } from './SofaProfileController';
import { EventControler } from './EventController';
import { ObservationController } from './ObservationsController';
import { RootController } from './RootController';
import { ObservationLabelisationController } from './ObservationsLabelisationController';
import { ObservationEvaluationController } from './ObservationsEvaluationController';
import { ObservationValidationController } from './ObservationsValidationController';
import { MenuController } from './MenuController';
import { DailyChallengeController } from './DailyChallengeController';
import { ItineraryControler } from './ItineraryController';

const eventController = new EventControler();
const observationController = new ObservationController();
const observationLabelisationController = new ObservationLabelisationController();
const observationEvaluationController = new ObservationEvaluationController();
const observationValidationController = new ObservationValidationController();
const profileController = new ProfileController();
const sofaProfileController = new SofaProfileController();
const userController = new UserController();
const rootController = new RootController();
const menuController = new MenuController();
const dailyChallengeController = new DailyChallengeController();
const itineraryController = new ItineraryControler();

export {
    eventController,
    observationController,
    observationLabelisationController,
    observationEvaluationController,
    observationValidationController,
    profileController,
    sofaProfileController,
    userController,
    rootController,
    menuController,
    dailyChallengeController,
    itineraryController
};