import * as express from 'express';
import { rootController } from '../../controller';
import { routerV1 } from './v1';

export const apiRouter = express.Router();
apiRouter.use('/v1', routerV1);
apiRouter.get('/', rootController.getRoot);