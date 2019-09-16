const express = require('express');
const userService = require('../../services/users/user');
let router = express.Router();

router.get('/', userService.getUsers);

router.get('/:id', userService.getUserById);

router.post('/', userService.createUser);

router.put('/:id', userService.updateUser);

router.delete('/:id', userService.deleteUser);

router.get('/:id/events', userService.getUserEvents);

router.get('/:id/observations', userService.getUserObservations);

router.post('/:id/join/:eventId', userService.joinEvent);

module.exports = router;
