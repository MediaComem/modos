const express = require('express');
const rootService = require('../../services/root/root');
const router = express.Router();

router.get('/', rootService.getRoot);

module.exports = router;
