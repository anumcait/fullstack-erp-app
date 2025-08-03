// const express = require('express');
// import { login } from '../controllers/authController.js';
// const router = express.Router();
// router.post('/login', login);
// export default router;

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/', employeeController.getAllEmployees);

//Get Employees for List selection

// router.get('/list-employees',employeeController.getEmployeesForList);

// Get employee by ID
router.get('/:empid', employeeController.getEmployeeById);

// Create new employee
router.post('/add-employee', employeeController.createEmployee);

// Update employee by ID
router.put('/:empid', employeeController.updateEmployee);

// Delete employee by ID
router.delete('/:empid', employeeController.deleteEmployee);

module.exports = router;

