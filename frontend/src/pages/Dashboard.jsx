import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [projectMetrics, setProjectMetrics] = useState({
        totalTasks: 0,
        completedTasks: 0,
        completionRate: 0,
        totalEmployees: 0
    });
    const { user } = useAuth();

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const response = await apiClient.get('/tasks/dashboard');
                setProjectMetrics(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        loadDashboardData();
    }, []);

    const calculateGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return 'Good Morning';
        if (currentHour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Calculate stroke dashoffset for circular progress
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (projectMetrics.completionRate / 100) * circumference;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end">
                <div>
                    <h1 className="text-5xl font-thin tracking-tight">
                        {calculateGreeting()}, <br />
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400">
                            {user?.name?.split(' ')[0] || 'Team'}
                        </span>
                    </h1>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">System Status</p>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-lg font-medium text-emerald-400">Operational</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 backdrop-blur-lg p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <h2 className="text-xl font-light text-slate-300 mb-8 uppercase tracking-widest">Project Velocity</h2>
                    <div className="relative">
                        <svg className="w-64 h-64 transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-700"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={progressOffset}
                                className="text-blue-500 transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-5xl font-bold text-white">{Math.round(projectMetrics.completionRate)}%</span>
                            <p className="text-xs text-slate-400 uppercase mt-1">Complete</p>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-slate-400 text-sm max-w-xs">
                        Your team is moving fast. Keep up the momentum to reach your goals.
                    </p>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-md p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Tasks</p>
                                <h3 className="text-6xl font-bold text-white mt-4 group-hover:scale-110 transition-transform origin-left duration-300">
                                    {projectMetrics.totalTasks}
                                </h3>
                            </div>
                            <div className="p-3 bg-blue-500/20">
                                <div className="w-6 h-6 border-2 border-blue-400"></div>
                            </div>
                        </div>
                        <div className="mt-8 h-1 w-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-blue-500 w-3/4"></div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-md p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Completed</p>
                                <h3 className="text-6xl font-bold text-white mt-4 group-hover:scale-110 transition-transform origin-left duration-300">
                                    {projectMetrics.completedTasks}
                                </h3>
                            </div>
                            <div className="p-3 bg-emerald-500/20">
                                <div className="w-6 h-6 border-2 border-emerald-400 rounded-full"></div>
                            </div>
                        </div>
                        <div className="mt-8 h-1 w-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-1/2"></div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white/5 backdrop-blur-md p-8 border border-white/10 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Team Members</p>
                            <h3 className="text-4xl font-bold text-white mt-2">{projectMetrics.totalEmployees}</h3>
                        </div>
                        <div className="flex -space-x-4">
                            {[...Array(Math.min(5, projectMetrics.totalEmployees))].map((_, i) => (
                                <div key={i} className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-800 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            {projectMetrics.totalEmployees > 5 && (
                                <div className="w-12 h-12 bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-sm font-bold text-slate-400 shadow-lg">
                                    +{projectMetrics.totalEmployees - 5}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
