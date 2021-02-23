import * as express from 'express';
import { authenticateUser } from '../../config/middlewares';
import { menuController } from '../../controller';


export const menuRouter = express.Router();

menuRouter.get('/', authenticateUser, menuController.getMenuData);