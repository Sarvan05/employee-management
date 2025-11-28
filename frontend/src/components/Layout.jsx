import React from 'react';
import { Briefcase, CheckSquare, LayoutDashboard, LogOut, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const performLogout = () => {
        logout();
        navigate('/login');
    };

    const appNavigation = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    ];

    if (user?.role === 'admin') {
        appNavigation.push({ path: '/employees', label: 'Employees', icon: Users });
    }

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden relative">

            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div>
            <div className="absolute top-[40%] left-[30%] w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 pointer-events-none"></div>

            <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-20">
                <div className="p-6 flex items-center space-x-2 border-b border-white/10">
                    <Briefcase className="w-8 h-8 text-blue-500" />
                    <span className="text-xl font-bold text-white tracking-wide">TaskTracker</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {appNavigation.map((navItem) => {
                        const IconComponent = navItem.icon;
                        const isRouteActive = location.pathname === navItem.path;
                        return (
                            <Link
                                key={navItem.path}
                                to={navItem.path}
                                className={`flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${isRouteActive
                                    ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <IconComponent className="w-5 h-5" />
                                <span className="font-medium">{navItem.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-2 bg-white/5 border border-white/5">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-200 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={performLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto z-10 relative scrollbar-hide">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
