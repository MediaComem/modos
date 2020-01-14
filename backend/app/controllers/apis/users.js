const express = require('express');
const userService = require('../../services/users/users');
const profileService = require('../../services/users/profile');
const { authenticateUser } = require('../../configs/middlewares');
const router = express.Router();


router.get('/', authenticateUser, userService.getUser);

router.post('/', userService.createUser);

router.put('/', authenticateUser, userService.updateUser);

router.delete('/', authenticateUser, userService.deleteUser);

router.get('/events', authenticateUser, userService.getUserEvents);

router.get('/observations', authenticateUser, userService.getUserObservations);

router.post('/join/:eventId', authenticateUser, userService.joinEvent);

router.get('/profile', authenticateUser, profileService.getProfile);

router.post('/profile', authenticateUser, profileService.createProfile);

router.put('/profile', authenticateUser, profileService.updateProfile);

module.exports = router;
