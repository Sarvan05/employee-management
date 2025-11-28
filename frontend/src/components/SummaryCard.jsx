import React from 'react';

const SummaryCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default SummaryCard;
