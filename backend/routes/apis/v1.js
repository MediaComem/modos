const express = require('express');
const userController = require('../../controllers/apis/user');
const eventController = require('../../controllers/apis/event');
const observationController = require('../../controllers/apis/observation');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../openapi.json');
const { authenticate } = require('../../services/users/user');

let router = express.Router();

router.post('/authenticate', authenticate);
router.use('/users', userController);
router.use('/events', eventController);
router.use('/observations', observationController);

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }'
}));

module.exports = router;
