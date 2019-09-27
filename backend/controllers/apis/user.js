const express = require('express');
const userService = require('../../services/users/user');
const profileService = require('../../services/users/profile');
let router = express.Router();

router.get('/', userService.getUsers);

router.get('/:id', userService.getUserById);

router.post('/', userService.createUser);

router.put('/:id', userService.updateUser);

router.delete('/:id', userService.deleteUser);

router.get('/:id/events', userService.getUserEvents);

router.get('/:id/observations', userService.getUserObservations);

router.post('/:id/join/:eventId', userService.joinEvent);

router.get('/:id/profile', profileService.getProfile);

router.post('/:id/profile', profileService.createProfile);

router.put('/:id/profile', profileService.updateProfile);

module.exports = router;
