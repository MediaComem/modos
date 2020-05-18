const express = require('express');
const rootService = require('../../services/root/root');

export const rootController = express.Router();

rootController.get('/', rootService.getRoot);
