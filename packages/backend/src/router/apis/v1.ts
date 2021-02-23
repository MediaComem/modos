import * as express from 'express';
import { userController } from '../../controller';
import { userRouter } from './userRouter';
import { eventRouter } from './eventRouter';
import { observationRouter } from './observationRouter';
import { menuRouter } from './menuRouter';
import { profileRouter } from './profileRouter';
import { sofaProfileRouter } from './sofaProfileRouter';
import { itineraryRouter } from './itineraryRouter';
import * as swaggerUi from 'swagger-ui-express';
import { observationValidationRouter } from './observationValidationRouter';
import { observationEvaluationRouter } from './observationEvaluationRouter';
import { observationLabelisationRouter } from './observationLabelisationRouter';


const swaggerDocument = require('../../../openapi.json');


export const routerV1 = express.Router();
routerV1.use('/authenticate', userController.authenticate);
routerV1.use('/menu', menuRouter);
routerV1.use('/users', userRouter);
routerV1.use('/users/profile', profileRouter);
routerV1.use('/users/sofaProfile', sofaProfileRouter);
routerV1.use('/events', eventRouter);
routerV1.use('/observations', observationRouter);
routerV1.use('/itinerary', itineraryRouter);

routerV1.use('/observationsLabelisations', observationLabelisationRouter);
routerV1.use('/observationsValidations', observationValidationRouter);
routerV1.use('/observationsEvaluations', observationEvaluationRouter);

routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }'
}));