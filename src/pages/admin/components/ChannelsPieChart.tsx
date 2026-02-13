import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DashboardData } from '@/types/adminDashboard';

interface ChannelsPieChartProps {
  dashboardData: DashboardData | null;
}

export default function ChannelsPieChart({ dashboardData }: ChannelsPieChartProps) {
  // Calculate channel data from dashboard stats
  const getChannelData = () => {
    if (!dashboardData) return [];
    
    const total = dashboardData.admin.users + dashboardData.admin.products + dashboardData.admin.escrows;
    
    return [
      { 
        name: 'Total Users', 
        value: Math.round((dashboardData.admin.users / total) * 100),
        color: '#10b981' 
      },
      { 
        name: 'All Products', 
        value: Math.round((dashboardData.admin.products / total) * 100),
        color: '#3b82f6' 
      },
      { 
        name: 'Escrow Request', 
        value: Math.round((dashboardData.admin.escrows / total) * 100),
        color: '#f59e0b' 
      },
    ];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Channels</h2>
      </div>

      <div className="flex justify-center mb-6">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={getChannelData()}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {getChannelData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {getChannelData().map((channel) => (
          <div key={channel.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: channel.color }}
              ></div>
              <span className="text-sm text-gray-600">{channel.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800">{channel.value}%</div>
              <div className="text-xs text-gray-500">
                {channel.name === 'Total Users' && `+${dashboardData?.admin.users}`}
                {channel.name === 'All Products' && `+${dashboardData?.admin.products}`}
                {channel.name === 'Escrow Request' && `+${dashboardData?.admin.escrows}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
