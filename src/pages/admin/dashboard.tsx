import { useState, useEffect } from 'react';
import { 
  FaBox, 
  FaMoneyBillWave, 
  FaUsers, 
  FaChartBar, 
  FaCheckCircle, 
  FaTimesCircle,
  FaEllipsisV
} from 'react-icons/fa';
import React from 'react';

// Mock data for demonstration
const mockDashboardData = {
  wallet: "250000.50",
  admin: {
    users: 1250,
    products: 342,
    escrows: 89,
    admins: 5,
    tickets: 23
  },
  escrow: 89,
  products: 342,
  tickets: 23,
  liked: 156,
  wish_list: 78
};

const recentProducts = [
  {
    id: 1,
    Icon: FaBox,
    name: "Organic Tomatoes",
    status: "Accepted" as const,
    price: "₦2,500"
  },
  {
    id: 2,
    Icon: FaBox,
    name: "Fresh Vegetables Pack",
    status: "Pending" as const,
    price: "₦1,800"
  },
  {
    id: 3,
    Icon: FaBox,
    name: "Farm Fresh Eggs",
    status: "Rejected" as const,
    price: "₦1,200"
  },
  {
    id: 4,
    Icon: FaBox,
    name: "Organic Honey",
    status: "Accepted" as const,
    price: "₦3,500"
  }
];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('May');
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(false);

  // Format wallet amount
  const formatWallet = (wallet: string) => {
    return `₦${parseFloat(wallet).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p className="mt-2 text-sm text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your marketplace today.</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="May">May 2024</option>
              <option value="April">April 2024</option>
              <option value="March">March 2024</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {formatWallet(dashboardData.wallet)}
              </div>
              <p className="text-gray-600">Wallet Balance</p>
            </div>
          </div>
        </div>

        {/* Channel Distribution Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Channel Distribution</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400 mb-2">Chart</div>
              <p className="text-gray-600">Channel stats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          Icon={FaBox}
          title="All Products"
          value={dashboardData.admin.products.toString()}
          trend="+8.5%"
          trendUp={true}
          viewLink="#"
        />
        <StatCard
          Icon={FaMoneyBillWave}
          title="Wallet Balance"
          value={formatWallet(dashboardData.wallet)}
          trend="-4.2%"
          trendUp={false}
          viewLink="#"
        />
        <StatCard
          Icon={FaUsers}
          title="Total Users"
          value={dashboardData.admin.users.toString()}
          trend="+12.3%"
          trendUp={true}
          viewLink="#"
        />
        <StatCard
          Icon={FaChartBar}
          title="Escrows"
          value={dashboardData.admin.escrows.toString()}
          trend="+6.7%"
          trendUp={true}
          viewLink="#"
        />
      </div>

      {/* Activity & Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Escrow Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Escrow Activity</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ActivityCard
              Icon={FaCheckCircle}
              label="Completed"
              value="156"
              subtitle="Successful Transactions"
            />
            <ActivityCard
              Icon={FaChartBar}
              label="Pending"
              value="89"
              subtitle="Awaiting Confirmation"
            />
            <ActivityCard
              Icon={FaUsers}
              label="Active Users"
              value="1,250"
              subtitle="Registered Users"
            />
            <ActivityCard
              Icon={FaTimesCircle}
              label="Rejected"
              value="84"
              subtitle="Rejected Cases"
            />
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Reviews</h2>
          </div>
          <div className="space-y-4">
            <ReviewCard
              name="Johneth Sidesley"
              rating={4}
              comment="Very nice glasses, I ordered for my friend."
            />
            <ReviewCard
              name="Sarah Mitchell"
              rating={5}
              comment="Excellent quality products and fast delivery!"
            />
            <ReviewCard
              name="Michael Chen"
              rating={4}
              comment="Good service overall, would recommend."
            />
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Listed Products</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Photo</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Product Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  
                  <td className="py-4 px-4">
                    <div className="w-10 text-[#39B54A] h-10 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                      <product.Icon />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Accepted' 
                        ? 'bg-green-100 text-green-700'
                        : product.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gray-800">{product.price}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisV className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Products added recently
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  Icon, 
  title, 
  value, 
  trend, 
  trendUp, 
  viewLink 
}: { 
  Icon: React.ComponentType;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  viewLink: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 text-[#39B54A] h-12 rounded-lg bg-green-50 flex items-center justify-center text-2xl">
          <Icon />
        </div>
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <button className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ 
  Icon, 
  label, 
  value, 
  subtitle 
}: { 
  Icon: React.ComponentType;
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-3xl mb-2 text-[#39B54A]">
        <Icon />
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}

function ReviewCard({ name, rating, comment }: { 
  name: string;
  rating: number;
  comment: string;
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <span className="text-green-600 font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{comment}</p>
        </div>
      </div>
    </div>
  );
}
