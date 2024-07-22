const express = require('express');
const router = express.Router();
const birthdayController = require('../controllers/birthdayController');

// Get today's birthdays
router.get('/today', birthdayController.getTodayBirthdays);

// Get upcoming birthdays
router.get('/upcoming', birthdayController.getUpcomingBirthdays);

module.exports = router;
