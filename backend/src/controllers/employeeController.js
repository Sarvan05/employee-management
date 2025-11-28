const { Employee, Task } = require('../models');
const bcrypt = require('bcryptjs');

const listAllStaff = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

const fetchStaffDetails = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Task, as: 'tasks' }]
        });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
};

const modifyStaffRecord = async (req, res) => {
    try {
        const { name, email, role, department } = req.body;
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        await employee.update({ name, email, role, department });
        res.json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
};

const removeStaffRecord = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.destroy();
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};

module.exports = { getAllEmployees: listAllStaff, getEmployeeById: fetchStaffDetails, updateEmployee: modifyStaffRecord, deleteEmployee: removeStaffRecord };
