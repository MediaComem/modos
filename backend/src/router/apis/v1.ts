import * as express from 'express';
import { userController } from '../../controller';
import { userRouter } from './userRouter';
import { eventRouter } from './eventRouter';
import { observationRouter } from './observationRouter';
import { profileRouter } from './profileRouter';
import * as swaggerUi from 'swagger-ui-express';


const swaggerDocument = require('../../../openapi.json');





export const routerV1 = express.Router();
routerV1.use('/authenticate', userController.authenticate);
routerV1.use('/users', userRouter);
routerV1.use('/users/profile', profileRouter);
routerV1.use('/events', eventRouter);
routerV1.use('/observations', observationRouter);

routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }'
}));