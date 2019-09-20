const express = require('express');
const userController = require('../../controllers/apis/user');
const eventController = require('../../controllers/apis/event');
const observationController = require('../../controllers/apis/observation');

let router = express.Router();
router.use('/users', userController);
router.use('/events', eventController);
router.use('/observations', observationController);

module.exports = router;
