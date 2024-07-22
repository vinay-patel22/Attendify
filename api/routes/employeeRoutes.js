const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.addEmployee);
router.get('/', employeeController.getEmployees);
router.put('/:id', employeeController.updateEmployee); // Update employee
router.delete('/:id', employeeController.deleteEmployee); // Delete employee

module.exports = router;
