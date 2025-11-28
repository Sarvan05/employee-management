const sequelize = require('../config/database');
const Employee = require('./Employee');
const Task = require('./Task');

// Associations
Employee.hasMany(Task, { foreignKey: 'assigneeId', as: 'tasks' });
Task.belongsTo(Employee, { foreignKey: 'assigneeId', as: 'assignee' });

module.exports = {
    sequelize,
    Employee,
    Task
};
