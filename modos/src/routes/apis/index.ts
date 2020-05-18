import * as express from 'express';
// import { rootController } from '../../controller';
import { routerV1 } from './v1';

const pkg = require('../../../package.json');

export const apiRouter = express.Router();
// apiRouter.use('/', rootController);
apiRouter.use('/v1', routerV1);
