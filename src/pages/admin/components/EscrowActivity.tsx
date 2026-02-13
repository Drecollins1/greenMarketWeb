import React from 'react';
import { FaFileAlt, FaTruck, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import ActivityCard from './ActivityCard';
import { DashboardData } from '@/types/adminDashboard';

interface EscrowActivityProps {
  dashboardData: DashboardData | null;
}

export default function EscrowActivity({ dashboardData }: EscrowActivityProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Escrow Activity Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <ActivityCard
          Icon={FaFileAlt}
          label="Escrow Requested"
          value={dashboardData?.escrow.toString() || "0"}
          subtitle="Product"
        />
        <ActivityCard
          Icon={FaTruck}
          label="Successful Delivered"
          value="72"
          subtitle="New"
        />
        <ActivityCard
          Icon={FaExclamationTriangle}
          label="Reported"
          value="16"
          subtitle="Supplier Item Cases"
        />
        <ActivityCard
          Icon={FaTimesCircle}
          label="Rejected"
          value="84"
          subtitle="Rejected Cases"
        />
      </div>
    </div>
  );
}
