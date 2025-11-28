import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { UserPlus, Trash2, Mail, Briefcase } from 'lucide-react';

const Employees = () => {
    const [staffList, setStaffList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: ''
    });

    useEffect(() => {
        loadStaffData();
    }, []);

    const loadStaffData = async () => {
        try {
            const response = await apiClient.get('/employees');
            setStaffList(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/auth/register', newEmployee);
            setIsModalOpen(false);
            setNewEmployee({ name: '', email: '', password: '', role: 'employee', department: '' });
            loadStaffData();
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('Error creating employee');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await apiClient.delete(`/employees/${id}`);
                loadStaffData();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">Employees</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-medium"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>Add Employee</span>
                </button>
            </div>

            <div className="bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {staffList.map((employee) => (
                            <tr key={employee.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{employee.name}</div>
                                            <div className="text-sm text-gray-400 flex items-center space-x-1">
                                                <Mail className="w-3 h-3" />
                                                <span>{employee.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold border ${employee.role === 'admin'
                                        ? 'bg-purple-500/20 text-purple-200 border-purple-500/30'
                                        : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                                        }`}>
                                        {employee.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {employee.department || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {employee.role !== 'admin' && (
                                        <button
                                            onClick={() => handleDelete(employee.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900/90 backdrop-blur-xl shadow-2xl w-full max-w-md p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6 text-white">Add New Employee</h2>
                        <form onSubmit={handleCreateEmployee} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={newEmployee.name}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newEmployee.email}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={newEmployee.password}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                    className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                                    <select
                                        value={newEmployee.role}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all appearance-none"
                                    >
                                        <option value="employee" className="bg-gray-900">Employee</option>
                                        <option value="admin" className="bg-gray-900">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                                    <input
                                        type="text"
                                        value={newEmployee.department}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-slate-500 transition-all"
                                    />
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
                                    Create Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
