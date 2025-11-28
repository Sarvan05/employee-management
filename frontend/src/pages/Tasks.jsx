import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';
import { Plus, Filter } from 'lucide-react';

const Tasks = () => {
    const [taskList, setTaskList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';


    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
        assigneeId: ''
    });

    useEffect(() => {
        retrieveTasks();
        if (isAdmin) {
            loadEmployeeList();
        }
    }, [filterStatus]);

    const retrieveTasks = async () => {
        try {
            const params = filterStatus ? { status: filterStatus } : {};
            const response = await apiClient.get('/tasks', { params });
            setTaskList(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const loadEmployeeList = async () => {
        try {
            const response = await apiClient.get('/employees');
            setEmployeeList(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await apiClient.put(`/tasks/${taskId}`, { status: newStatus });
            retrieveTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await apiClient.delete(`/tasks/${taskId}`);
                retrieveTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const submitNewTask = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/tasks', newTask);
            setIsModalOpen(false);
            setNewTask({ title: '', description: '', status: 'pending', dueDate: '', assigneeId: '' });
            retrieveTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">Tasks</h1>
                <div className="flex space-x-3">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <option value="" className="bg-gray-900 text-white">All Status</option>
                            <option value="pending" className="bg-gray-900 text-white">Pending</option>
                            <option value="in_progress" className="bg-gray-900 text-white">In Progress</option>
                            <option value="completed" className="bg-gray-900 text-white">Completed</option>
                        </select>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Task</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {taskList.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                        isAdmin={isAdmin}
                        currentUserId={user?.id}
                    />
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900/90 backdrop-blur-xl shadow-2xl w-full max-w-lg p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6 text-white">Create New Task</h2>
                        <form onSubmit={submitNewTask} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    rows="3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all [color-scheme:dark]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Assignee</label>
                                    <select
                                        value={newTask.assigneeId}
                                        onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all appearance-none"
                                        required
                                    >
                                        <option value="" className="bg-gray-900">Select Employee</option>
                                        {employeeList.filter(emp => emp.role !== 'admin').map((emp) => (
                                            <option key={emp.id} value={emp.id} className="bg-gray-900">{emp.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02]"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default Tasks;
