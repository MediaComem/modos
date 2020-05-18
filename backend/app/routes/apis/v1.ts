import express from 'express';
import { userController } from '../../controllers/apis/users';
import { eventController } from '../../controllers/apis/events';
import { observationController } from '../../controllers/apis/observations';
import swaggerUi from 'swagger-ui-express';
import { userService } from '../../services';

export const routerV1 = express.Router();
const swaggerDocument = require('../../../openapi.json');

routerV1.post('/authenticate', userService.authenticate);
routerV1.use('/users', userController);
routerV1.use('/events', eventController);
routerV1.use('/observations', observationController);

routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }'
}));
