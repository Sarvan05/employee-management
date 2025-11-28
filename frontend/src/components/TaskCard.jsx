import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, onDelete, isAdmin, currentUserId }) => {
    const statusTheme = {
        pending: 'bg-yellow-500/10 text-yellow-200 border-yellow-500/20',
        in_progress: 'bg-blue-500/10 text-blue-200 border-blue-500/20',
        completed: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'
    };

    const isAssignee = task.assigneeId === currentUserId;
    const canEdit = isAdmin || isAssignee;

    return (
        <div className="bg-gray-800/40 backdrop-blur-xl shadow-lg border border-white/10 p-5 hover:bg-gray-800/60 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{task.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium border ${statusTheme[task.status]}`}>
                    {task.status.replace('_', ' ')}
                </span>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{task.description}</p>

            <div className="space-y-3 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{task.assignee?.name || 'Unassigned'}</span>
                </div>
                {task.dueDate && (
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                {canEdit ? (
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className="text-sm bg-gray-900/50 border border-white/10 text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 outline-none px-2 py-1"
                    >
                        <option value="pending" className="bg-gray-900">Pending</option>
                        <option value="in_progress" className="bg-gray-900">In Progress</option>
                        <option value="completed" className="bg-gray-900">Completed</option>
                    </select>
                ) : (
                    <span className="text-sm text-gray-500 italic">Read only</span>
                )}

                {isAdmin && (
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium hover:bg-red-500/10 px-3 py-1 transition-colors"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
