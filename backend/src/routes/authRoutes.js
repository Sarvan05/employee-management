const express = require('express');
const { register: registerNewEmployee, login: authenticateEmployee } = require('../controllers/authController');
const { authenticate: verifyToken, authorize: checkRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/login', authenticateEmployee);

// Protected routes (e.g., only admin can register new employees)
router.post('/register', verifyToken, checkRole(['admin']), registerNewEmployee);

module.exports = router;
