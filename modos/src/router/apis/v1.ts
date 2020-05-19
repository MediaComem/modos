import * as express from 'express';
import { userRouter } from './userRouter';
import { userController } from '../../controller';
// import swaggerUi from 'swagger-ui-express';

// export const routerV1 = express.Router();
// const swaggerDocument = require('../../../openapi.json');

// routerV1.post('/authenticate', userService.authenticate);
// routerV1.use('/users', userRouter);
// routerV1.use('/events', eventController);
// routerV1.use('/observations', observationController);

// routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
//     customCss: '.swagger-ui .topbar { display: none }'
// }));

export const routerV1 = express.Router();
routerV1.use('/authenticate', userController.authenticate);
routerV1.use('/users', userRouter);
