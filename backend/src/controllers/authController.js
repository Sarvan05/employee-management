const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models');

const registerNewEmployee = async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;

        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            role,
            department
        });

        res.status(201).json({ message: 'Employee registered successfully', employeeId: employee.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering employee', error: error.message });
    }
};

const authenticateEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: employee.id, role: employee.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: employee.id,
                name: employee.name,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { register: registerNewEmployee, login: authenticateEmployee };
