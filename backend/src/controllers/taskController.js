const { Task, Employee } = require('../models');

const listTasks = async (req, res) => {
    try {
        const whereClause = {};
        if (req.user.role !== 'admin') {
            whereClause.assigneeId = req.user.id;
        }

        if (req.query.status) {
            whereClause.status = req.query.status;
        }

        const tasks = await Task.findAll({
            where: whereClause,
            include: [{ model: Employee, as: 'assignee', attributes: ['id', 'name'] }]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

const createNewTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, assigneeId } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            assigneeId
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

const modifyTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, assigneeId } = req.body;
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (req.user.role !== 'admin') {
            if (task.assigneeId !== req.user.id) {
                return res.status(403).json({ message: 'Access denied' });
            }
            if (title || description || dueDate || assigneeId) {
                await task.update({ status });
                return res.json(task);
            }
        }

        await task.update({ title, description, status, dueDate, assigneeId });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

const removeTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

const fetchDashboardMetrics = async (req, res) => {
    try {
        const totalTasks = await Task.count();
        const completedTasks = await Task.count({ where: { status: 'completed' } });
        const totalEmployees = await Employee.count();

        res.json({
            totalTasks,
            completedTasks,
            completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
            totalEmployees
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};

module.exports = { getAllTasks: listTasks, createTask: createNewTask, updateTask: modifyTask, deleteTask: removeTask, getDashboardStats: fetchDashboardMetrics };
