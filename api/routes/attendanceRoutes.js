const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.submitAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/report', attendanceController.getAttendanceReport);
module.exports = router;
