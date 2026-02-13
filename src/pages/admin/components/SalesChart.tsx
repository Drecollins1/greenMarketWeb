import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for sales chart (you should replace with real API data)
const salesData = [
  { date: '01 Jan', sales: 4200, order: 3800 },
  { date: '05 Jan', sales: 3800, order: 3200 },
  { date: '10 Jan', sales: 5100, order: 4500 },
  { date: '15 Jan', sales: 4600, order: 4200 },
  { date: '20 Jan', sales: 5800, order: 5200 },
  { date: '25 Jan', sales: 5200, order: 4800 },
  { date: '30 Jan', sales: 6100, order: 5600 },
  { date: '05 Feb', sales: 5500, order: 5000 },
  { date: '10 Feb', sales: 6800, order: 6200 },
  { date: '15 Feb', sales: 6200, order: 5800 },
  { date: '20 Feb', sales: 7100, order: 6500 },
  { date: '25 Feb', sales: 6600, order: 6000 },
];

interface SalesChartProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  walletAmount: string;
}

export default function SalesChart({ timeFilter, setTimeFilter, walletAmount }: SalesChartProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Sales Chart</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-300"></div>
              <span className="text-gray-600">Order</span>
            </div>
          </div>
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
        </select>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-800">
            {walletAmount}
          </span>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
            +8.3%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="order" 
            stroke="#6ee7b7" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
