const express = require('express');
const { getAllTasks: listTasks, createTask: createNewTask, updateTask: modifyTask, deleteTask: removeTask, getDashboardStats: fetchDashboardMetrics } = require('../controllers/taskController');
const { authenticate: verifyToken, authorize: checkRole } = require('../middleware/auth');

const router = express.Router();

router.use(verifyToken);

router.get('/', listTasks);
router.get('/dashboard', fetchDashboardMetrics); // Dashboard summary
router.post('/', checkRole(['admin']), createNewTask);
router.put('/:id', modifyTask); // Logic inside controller handles permission for update
router.delete('/:id', checkRole(['admin']), removeTask);

module.exports = router;
