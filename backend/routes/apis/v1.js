const express = require('express');
const userController = require('../../controllers/apis/user');
// const eventController = require('../../controllers/apis/event');

let router = express.Router();
router.use('/users', userController);
// router.use('/events', eventController);

module.exports = router;
