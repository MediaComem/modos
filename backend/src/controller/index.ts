import { UserController } from './UserController';
import { ProfileController } from './ProfileController';

const profileController = new ProfileController();
const userController = new UserController();

export {
    profileController,
    userController
};