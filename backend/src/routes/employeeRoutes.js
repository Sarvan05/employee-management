const express = require('express');
const { getAllEmployees: listAllStaff, getEmployeeById: fetchStaffDetails, updateEmployee: modifyStaffRecord, deleteEmployee: removeStaffRecord } = require('../controllers/employeeController');
const { authenticate: verifyToken, authorize: checkRole } = require('../middleware/auth');

const router = express.Router();

router.use(verifyToken);

router.get('/', listAllStaff);
router.get('/:id', fetchStaffDetails);
router.put('/:id', checkRole(['admin']), modifyStaffRecord);
router.delete('/:id', checkRole(['admin']), removeStaffRecord);

module.exports = router;
