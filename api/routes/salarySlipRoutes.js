const express = require('express');
const router = express.Router();
const salarySlipController = require('../controllers/salarySlipController');

router.get('/', salarySlipController.generateSalarySlips);

module.exports = router;
