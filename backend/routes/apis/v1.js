const express = require('express');
const userController = require('../../controllers/apis/user');
const eventController = require('../../controllers/apis/event');
const observationController = require('../../controllers/apis/observation');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

let router = express.Router();

router.use('/users', userController);
router.use('/events', eventController);
router.use('/observations', observationController);

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }'
}));

module.exports = router;
