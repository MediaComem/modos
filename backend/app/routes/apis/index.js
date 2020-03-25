const express = require('express');
const pkg = require('../../../package.json');
const rootController = require('../../controllers/apis/root');
const v1ApiController = require('./v1');

const router = express.Router();
router.use('/v1', v1ApiController);
router.use('/', rootController);

module.exports = router;
