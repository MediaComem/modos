import express from 'express';
import { rootController } from '../../controllers/apis/root';
import { routerV1 } from './v1';

const pkg = require('../../../package.json');

export const apiRouter = express.Router();
apiRouter.use('/v1', routerV1);
apiRouter.use('/', rootController);
