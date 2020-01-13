const express = require('express');
const userService = require('../../services/users/users');
const profileService = require('../../services/users/profile');
const { authentifyUser } = require('../../configs/middlewares');
const router = express.Router();


router.get('/', authentifyUser, userService.getUser);

router.post('/', userService.createUser);

router.put('/', authentifyUser, userService.updateUser);

router.delete('/', authentifyUser, userService.deleteUser);

router.get('/events', authentifyUser, userService.getUserEvents);

router.get('/observations', authentifyUser, userService.getUserObservations);

router.post('/join/:eventId', authentifyUser, userService.joinEvent);

router.get('/profile', authentifyUser, profileService.getProfile);

router.post('/profile', authentifyUser, profileService.createProfile);

router.put('/profile', authentifyUser, profileService.updateProfile);

module.exports = router;
