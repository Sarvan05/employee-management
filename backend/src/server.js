const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize, Employee } = require('./models');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);

const bootstrapApp = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced successfully');

        const adminExists = await Employee.findOne({ where: { role: 'admin' } });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            await Employee.create({
                name: 'System Admin',
                email: 'project.manager@gmail.com',
                password: hashedPassword,
                role: 'admin',
                department: 'Management'
            });
            console.log('Default admin created: project.manager@gmail.com / Admin@123');
        }

        const employeeExists = await Employee.findOne({ where: { email: 'developer.one@gmail.com' } });
        if (!employeeExists) {
            const hashedPassword = await bcrypt.hash('User@123', 10);
            await Employee.create({
                name: 'John Developer',
                email: 'developer.one@gmail.com',
                password: hashedPassword,
                role: 'employee',
                department: 'Engineering'
            });
            console.log('Default employee created: developer.one@gmail.com / User@123');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

bootstrapApp();
