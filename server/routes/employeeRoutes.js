const express = require('express');
const { register, upload, getAllEmployees } = require('../controllers/employeeController');

const router = express.Router();

// Registration with image upload
// Apply the `upload` middleware first, then call the `register` function
router.post('/', upload, register);

// Fetch all employees
router.get('/', getAllEmployees);

module.exports = router;
